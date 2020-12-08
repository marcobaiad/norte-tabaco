import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Logo from '../img/logoNT1.png'
import App from '../../src/App.css';
import clienteAxios from '../utils/clienteAxios';
import Login from '../components/Login';


const NavBar = () => {

  const history = useHistory();
  const [btnLog, setBtnLog] = React.useState('Iniciar');
  const [product, setProduct] = React.useState('Cigarrillos');
  const logeado = localStorage.getItem('token');

  const logOutHanlder = async () => {
    try {
        const logout = await clienteAxios.get('api/v1/logout');
        localStorage.removeItem('token');
        setBtnLog('Iniciar');
        history.push('/');
    } catch (error) {
        console.log(error);
    }
  }

  const btnLogout = () => {
    setBtnLog('Cerrar')
  }

  React.useEffect(() => {
    logeado && btnLogout();
  }, [logeado])

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark text-white">
        <img src={Logo} className="imgLogo p-0 m-0" alt="..." />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/cigarrillos" onClick={() => setProduct('Cigarrillos')}>Cigarros <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/" onClick={() => setProduct('Fuegos Artificiales')}>Fuegos Artificiales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white"  data-toggle="modal" data-target={btnLog == 'Iniciar' && "#loginModal"} onClick={btnLog == 'Cerrar' && logOutHanlder}>{btnLog} Sesión</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Login btnLogout={btnLogout}  />
      { window.location.pathname !== '/admin' &&
      <> 
        <h1 className="text-center pt-3">Norte Tabaco</h1>
        <hr />
        <h3 className="text-center pt-4 ">Somos lideres en venta mayorista de {product} en todo el país. Déjanos tu consulta por cualquier producto y mejoramos cualquier precio que hayas escuchado. También recuerda que puedes dejarnos tus datos de contacto para que nosotros nos contactemos contigo.</h3>
      </>
      }
    </>
  )
}

export default NavBar

