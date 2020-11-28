import React from 'react';
import { Link } from 'react-router-dom';
import dataCard from '../utils/dataCards';
import clienteAxios from '../utils/clienteAxios';
import Swal from 'sweetalert2';

const CigarrillosPage = () => {

  const [modalDatos, setModalDatos] = React.useState();
  const [dataMessage, setDataMessage] = React.useState({});
  const [cardCigarros, setCardCigarros] = React.useState();

  const formContact = React.useRef();

  const modal = (datos, indice) => {
    setModalDatos({ ...modalDatos, datos, indice });
    setDataMessage({ ...dataMessage, product: datos.marca });
  }

  const formReset = () => {
    dataMessage && setDataMessage({ ...dataMessage, nameClient: '', cellNumber: '', message: '' });
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.post('api/v1/send', dataMessage);
      formReset();
      Swal.fire({
        icon: 'success',
        title: 'Envio Exitoso. Pronto responderemos tu consulta',
      });
    } catch (error) {
      console.log(error);
    }
  }

  const CardsCigarrillo = () => {
    return (
      dataCard.cigarros.map((c, i) =>
        <Link onClick={() => modal(c, i)} className="col mb-4 text-dark" type="button" data-toggle="modal" data-target={`#modal${i}`}>
          <div className="card h-100 ">
            <img src={c.img} className="card-img-top img-fluid" alt={c.marca} />
            <div className="card-body">
              <h5 className="card-title">{c.marca}</h5>
              <p className="card-text">{c.description}</p>
            </div>
          </div>
        </Link>
      ))
  }

  React.useEffect(() => {
    setCardCigarros(<CardsCigarrillo />)
  }, [])

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 justify-content-center pt-4 m-0">
          {cardCigarros}
        </div>
        <div className="modal fade " id={`modal${modalDatos && modalDatos.indice}`} tabindice="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{modalDatos && modalDatos.datos.marca}</h5>
                <button type="button" className="close" onClick={formReset} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={modalDatos && modalDatos.datos.img.default} className="card-img-top" alt="..." />
                <div className="row pt-2">
                  <div className="col-12 col-sm-3 ">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a className="nav-link active text-center" id={`v-pills-home-tab${modalDatos && modalDatos.indice}`} data-toggle="pill" data-target={`#v-pills-home${modalDatos && modalDatos.indice}`} role="tab" aria-controls={`v-pills-home${modalDatos && modalDatos.indice}`} aria-selected="true" >Info</a>
                      <a className="nav-link text-center" id={`v-pills-profile-tab${modalDatos && modalDatos.indice}`} data-toggle="pill" data-target={`#v-pills-profile${modalDatos && modalDatos.indice}`} role="tab" aria-controls={`v-pills-profile${modalDatos && modalDatos.indice}`} aria-selected="false">Contacto</a>
                    </div>
                  </div>

                  <div className="col-12 col-sm-9">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div className="tab-pane fade show active" id={`v-pills-home${modalDatos && modalDatos.indice}`} role="tabpanel" aria-labelledby={`v-pills-home-tab${modalDatos && modalDatos.indice}`}>
                        <p>{modalDatos && modalDatos.datos.descriptionModal}
                        </p>
                      </div>

                      <div className="tab-pane fade" id={`v-pills-profile${modalDatos && modalDatos.indice}`} role="tabpanel" aria-labelledby={`v-pills-profile-tab${modalDatos && modalDatos.indice}`}>
                        <form className="pt-2" ref={formContact}>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <input
                                type="text"
                                name='nameClient'
                                maxLength='32'
                                value={dataMessage && dataMessage.nameClient}
                                onChange={e => setDataMessage({ ...dataMessage, [e.target.name]: e.target.value })}
                                id="nombre"
                                className="form-control"
                                placeholder='Nombre Completo' />
                            </div>
                            <div className="form-group col-md-6">
                              <input
                                type="number"
                                className="form-control"
                                id="cellphone"
                                placeholder='Numero de teléfono'
                                name="cellNumber"
                                value={dataMessage && dataMessage.cellNumber}
                                onChange={e => setDataMessage({ ...dataMessage, [e.target.name]: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              id="message-text"
                              placeholder='Consulta:'
                              name="message"
                              value={dataMessage && dataMessage.message}
                              onChange={e => setDataMessage({ ...dataMessage, [e.target.name]: e.target.value })}
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={formReset}>Cerrar</button>
                <button type="submit" className="btn btn-primary" onClick={sendMessage}>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CigarrillosPage;
