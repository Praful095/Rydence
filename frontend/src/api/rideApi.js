import axios from "axios";

const BASE_URL = "https://rydence-backend.onrender.com/api/v1";

export const getRideInfo = async (scenario = "normal") => {
  const response = await axios.get(`${BASE_URL}/ride-info`, {
    params: { scenario },
  });
  return response.data;
};
