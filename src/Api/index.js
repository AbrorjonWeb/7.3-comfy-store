import axios from "axios";

const API_URL = "https://strapi-store-server.onrender.com/api";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data.data;
};
