import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRideInfo = async (scenario = "normal") => {
  try {
    const response = await api.get(`/ride-info?scenario=${scenario}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ride info:", error);
    throw error;
  }
};
