import api from "./axios";

export const login = async (data) => {
    console.log(data);
    const response = await api.post('/api/v1/users/login', data);
    console.log(response);    
     return response;
}


export const createUser = async (userData) => {
    const response = await api.post('/api/v1/users/register', userData);
    console.log(response);
    return response;
}


export const fetchUserInfo = async () => {
    const response = await api.get('/api/v1/users/all');
    console.log(response);
    return response;
    
}

export const verifyAuth = async () => {
    return await api.get('/api/v1/users/me');
    
}
