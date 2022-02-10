import axios from "axios"

const BASE_URL = "https://api.mercadopago.com/"

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: "Bearer {{ACCESS_TOKEN}}"
    },
})