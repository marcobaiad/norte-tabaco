import React from 'react';
import clienteAxios from '../utils/clienteAxios';
import { Link } from 'react-router-dom';

const Admin = () => {

  const [consultasData, setConsultasData] = React.useState([]);
  const [dataModal, setDataModal] = React.useState();
  
  const cerrarModal = React.useRef();

  const getContactsHandler = async (req, res) => {
    try {
      const consultasdata = await clienteAxios.get('api/v1/getmessage');
      setConsultasData(consultasdata.data);
    } catch (error) {
      console.log(error);
    }
  }

  const infoMessage = (props) => {
    setDataModal(props);
  }

  const changeStateReadHandler = async (props) => {
    try {
      dataModal.read ?
        await clienteAxios.put(`api/v1/message/${props}`, { read: false })
        :
        await clienteAxios.put(`api/v1/message/${props}`, { read: true });

      getContactsHandler();
      cerrarModal.current.click();
    } catch (error) {
      console.log(error);
    }
  }

  const CardsConsultasUnRead = () => {
    return (
      consultasData.map(c => !c.read &&
        <div class="card mx-2 my-2 text-black col-10" onClick={() => infoMessage(c)}>
          <Link className="text-black text-decoration-none" data-toggle="modal" data-target="#modalConsultas">
            <div class="card-body py-1">
              <h4 className="card-title text-dark text-nowrap mb-0">Tienes un nuevo mensaje<span><i class="fas fa-check text-warning ml-2"></i> </span></h4>
            </div>
          </Link>
        </div>)
    )
  }

  const CardsConsultasRead = () => {
    return (
      consultasData.map(c => c.read &&
        <div class="card mx-2 my-2 text-black col-10" onClick={() => infoMessage(c)}>
          <Link className="text-black text-decoration-none" data-toggle="modal" data-target="#modalConsultas">
            <div class="card-body py-1">
              <h4 className="card-title text-dark text-nowrap mb-0">Mensajes leídos<span><i class="fas fa-check-double text-success ml-2"></i> </span></h4>
            </div>
          </Link>
        </div>)
    )
  }

  React.useEffect(() => {
    getContactsHandler();
  }, [])

  return (
    <>
      <h1 className="text-center">Administración Norte Tabaco</h1>
      <div className="row justify-content-arround mx-0">
        <div className="col-md-6">
          <h3 className="text-center">Consultas para Revisar</h3>
          <div className="row mx-0 overflow-auto">
            <CardsConsultasUnRead />
          </div>
        </div>
        <div className="col-md-6 overflow-auto">
          <h3 className="text-center">Consultas Revisadas</h3>
          <div className="row mx-0 overflow-auto">
            <CardsConsultasRead />
          </div>
        </div>
      </div>

      {/* Modal */}

      <div className="modal fade" id="modalConsultas" tabindex="-1" aria-labelledby="modalConsultas" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalConsultas">Cliente: {dataModal && dataModal.nameClient}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="">Numero del Cliente: {dataModal && dataModal.cellNumber}</p>
              <p className="mb-0">Mensaje: {dataModal && dataModal.message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={cerrarModal} >Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={() => changeStateReadHandler(dataModal && dataModal._id)}>Marcar como {dataModal && dataModal.read && "No"} Leida</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
