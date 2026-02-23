import api from "./axios";

const fetchStats = async () => {
  const response = await api.get("/api/v1/users/stats") 
 console.log(response);
 return response.data;
 
};

export const fetchAllQueries = async () => {
    const res = await api.get("/api/v1/queries/all");
    return res.data;
}

export const fetchAllCollaborations = async ( ) => {
    const res  = await api.get('/api/v1/collaboration/all');
    return res?.data;
}

export default fetchStats;
