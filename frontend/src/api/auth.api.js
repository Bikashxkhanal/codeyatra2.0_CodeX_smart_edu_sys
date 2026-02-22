import api from "./axios";

export const login = async (data) => {
    console.log(data);
    
    const response = await api.post('/api/v1/users/login', data);
    console.log(response);    
     return response;
}


export const createAccount = async () => {
    const response = await api.post('/api/v1/signup');
    console.log(response);
    return response;
}


