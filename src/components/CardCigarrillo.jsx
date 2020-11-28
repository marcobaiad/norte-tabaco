import React from 'react'
import { Link } from 'react-router-dom';
import melbourne from '../img/cigarrillos/melbourne.jpg'
import ModalCigarrillo from './ModalCigarrillo';


const CardCigarrillo = (props) => {
  const [modalDatos, setModalDatos] = React.useState()
  const { data, index } = props;

  console.log(index);

  const modal = (props) => {
    setModalDatos(props)
  }
  React.useEffect(() => {
    modal()
  }, [props])
  // console.log(modalDatos.img.default);

  return (
    <>
      <Link className="col mb-4 text-dark" type="button" data-toggle="modal" data-target={`#modaln${index}`}>
        <div className="card">
          <img src={data.img.default} className="card-img-top img-fluid" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{data.marca}</h5>
            <p className="card-text">{data.description}</p>
          </div>
        </div>
      </Link>
      <div className="modal fade " id={`modaln${index}`} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{data.marca}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={data.img.default} className="card-img-top img-fluid" alt="..." />
              <div className="row pt-2">
                <div className="col-12 col-sm-3 ">
                  <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active text-center" id={`#v-pills-home-tab${index}`} data-toggle="pill" data-target={`#v-pills-home${index}`} role="tab" aria-controls={`v-pills-home${index}`} aria-selected="true">Info</a>
                    <a className="nav-link text-center" id={`v-pills-profile-tab${index}`} data-toggle="pill" data-target={`#v-pills-profile${index}`} role="tab" aria-controls={`v-pills-profile${index}`} aria-selected="false">Contacto</a>
                  </div>
                </div>
                <div className="col-12 col-sm-9">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id={`v-pills-home${index}`} role="tabpanel" aria-labelledby={`v-pills-home-tab${index}`}>
                      <p>{data.descriptionModal}
                      </p>
                    </div>
                    <div className="tab-pane fade" id={`v-pills-profile${index}`} role="tabpanel" aria-labelledby={`v-pills-profile-tab${index}`}>
                      <form className="pt-2">
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              id="nombre"
                              className="form-control"
                              name='nameClient'
                              maxLength='10'
                              onChange={(e) => console.log(e.target.value)}
                              placeholder='Nombre Completo' />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="number"
                              className="form-control"
                              id="cellphone"
                              name="cellNumber"
                              onChange={(e) => console.log(e.target.value) }
                              placeholder='Numero de teléfono'
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            id="message-text"
                            name="message"
                            onChange={(e) => console.log(e.target.value) }
                            placeholder='Consulta:'
                          >
                          </textarea>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-primary" >Enviar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}



export default CardCigarrillo
