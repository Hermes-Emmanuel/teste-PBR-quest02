import axios from 'axios'

/**
 * CONFIGURAÇÃO DO AXIOS PARA FAZER A COMUNICAÇÃO COM O BACK
 */

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export default api 