import axios from 'axios';
import { API_URL } from '@env';

// creamos el cliente que usaremos para poder hacer las peticiones

const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// TODO: Interceptors
// los interceptors nos van a ayudar a leer de nuestro storage fisico y poder adjuntar nuestro token de acceso

export {
    tesloApi,
}
