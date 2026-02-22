import api from "./axios";

export const login = async () => {
    const response = await api.post('/api/v1/login');
    console.log(response);    
     return response;
}


export const createAccount = async () => {
    const response = await api.post('/api/v1/signup');
    console.log(response);
    return response;
}


