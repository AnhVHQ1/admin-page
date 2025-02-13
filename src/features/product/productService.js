import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};
const updateAProduct = async (product) => {
  try {
    const response = await axios.put(
      `${base_url}product/${product.id}`,
      product,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};
const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateAProduct,
  getProduct,
};

export default productService;
