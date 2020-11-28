import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalFA = (props) => {
  const [nameClient, setNameClient] = React.useState("");
  console.log("🚀 ~ file: ModalFA.jsx ~ line 7 ~ ModalFA ~ nameClient", nameClient)
  const [cellNumber, setCellNumber] = React.useState("");
  console.log("🚀 ~ file: ModalFA.jsx ~ line 8 ~ ModalFA ~ cellNumber", cellNumber)
  const [message, setMessage] = React.useState("");
  console.log("🚀 ~ file: ModalFA.jsx ~ line 9 ~ ModalFA ~ message", message)

  const sendForm = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/v1/send', { nameClient, cellNumber, message })
      Swal.fire({
        icon: 'success',
        title: 'Envio Exitoso. Pronto responderemos tu consulta',
      });
    } catch (error) {
      console.log(error)
    }
  }

  const { data } = props;

  return (
    <>
      {/* <!-- Modal --> */}
      <div className="modal fade " id="staticBackdrop" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{data.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src={data.img.default} className="card-img-top" alt="..." />
              <div className="row pt-2">
                <div className="col-12 col-sm-3 ">
                  <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active text-center" id="v-pills-home-tab" data-toggle="pill" data-target="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" >Info</button>
                    <button className="nav-link text-center" id="v-pills-profile-tab" data-toggle="pill" data-target="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Contacto</button>
                  </div>
                </div>

                <div className="col-12 col-sm-9">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                      <p>{data.descriptionModal}
                      </p>
                    </div>

                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                      <form className="pt-2">
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              name='nameClient'
                              maxLength='10'
                              onChange={e => setNameClient(e.target.value)}
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
                              onChange={e => setCellNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            id="message-text"
                            placeholder='Consulta:'
                            name="message"
                            onChange={e => setMessage(e.target.value)}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-primary" onClick={sendForm}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalFA