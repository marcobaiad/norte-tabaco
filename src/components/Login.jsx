import React from 'react';
import clienteAxios from '../utils/clienteAxios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login({ btnLogout }) {
    
    const history = useHistory();
    const cerrarModal = React.useRef();
    const [loginData, setLoginData] = React.useState({});

    const loginHandler = async () => {
        try {
            const login = await clienteAxios.post(`api/v1/login`, loginData);
            Swal.fire({
                icon: 'success',
                title: 'Logueado con Exito',
                timer: 1000,
                showConfirmButton: false
            })
            history.push('/admin');
            cerrarModal.current.click();
            btnLogout()
            localStorage.setItem('token', login.data.token);
        } catch (error) {
            const { response } = error
            Swal.fire({
                icon: 'error',
                title: response.data.mensaje,
                timer: 1000,
                showConfirmButton: false
            })
            console.log(response);
        }
    }
    
    return (
        <div className="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Ingresar Usuario</label>
                                <input className="form-control" onChange={e => setLoginData({...loginData, [e.target.name]: e.target.value})} type="text" name="username" id="user" maxLength="32"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Ingresar contraseña</label>
                                <input className="form-control" onChange={e => setLoginData({...loginData, [e.target.name]: e.target.value})} type="password" name="password" id="password" required title="La contraseña debe tener un mínimo de 8 caracteres, una mayuscula una minúscula y un número" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={cerrarModal}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={loginHandler}>Ingresar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
