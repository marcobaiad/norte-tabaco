import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: "https://boiling-cliffs-66663.herokuapp.com"
});

export default clienteAxios;