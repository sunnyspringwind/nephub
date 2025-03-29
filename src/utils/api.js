import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5214",
    headers: {
        "Content-Type": "application/json",
    }
})

export const fetchData = async (endpoint, authorize=false) => {
  try {
    if(authorize){
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    const token = userCredentials.token;
    const response = await api.get(endpoint, {
      headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      },
    });
    return response;
  } else {
    const response = await api.get(endpoint)
    return response;
    }}
  catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);    
  }
}

export const postData = async (endpoint, data, authorize=false) => {
    try {
      if(authorize){
        const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));;
        const token = userCredentials.token;
      const response = await api.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    }else {
      const response = await api.post(endpoint, data)
      return response;
      };
    } catch (error) {
      throw new Error(`Error posting data: ${error.message}`);
    }
  };

  export const putData = async (endpoint, data, authorize=false) => {
    try {
      if(authorize){
        const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
        const token = userCredentials.token;
        
        const response = await api.put(endpoint, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        return response;
      } else {
        const response = await api.put(endpoint, data)
        return response;
      }
    } catch (error) {
      throw new Error(`Error updating data: ${error.message}`);
    }
  };

export const deleteData = async (endpoint, authorize=false, data=null) => {
    try {
      if(authorize){
        const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
        const token = userCredentials.token;
        
        const response = await api.delete(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data // Optional data payload for delete requests
        });
        return response;
      } else {
        const response = await api.delete(endpoint)
        return response;
      }
    } catch (error) {
      throw new Error(`Error deleting data: ${error.message}`);
    }
  };