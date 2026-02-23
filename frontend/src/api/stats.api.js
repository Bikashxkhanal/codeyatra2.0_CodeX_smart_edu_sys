import api from "./axios";

const fetchStats = async () => {
  const response = await api.get("/api/v1/users/stats") 
 console.log(response);
 return response;
 
};

export default fetchStats;
