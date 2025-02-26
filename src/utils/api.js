import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5214",
    headers: {
        "Content-Type": "application/json",
    }
})

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);    }
};

export const postData = async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error posting data: ${error.message}`);
    }
  };