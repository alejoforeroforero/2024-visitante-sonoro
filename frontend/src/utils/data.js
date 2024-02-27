import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ADMIN_API = axios.create({
  baseURL: BACKEND_URL
});

export const handleApiError = async (error) => {
  try {
    const errorMessage =
      error.response.data.message || "An unexpected error occurred.";
    const data = null;
    toast.error(errorMessage);
    return { error: errorMessage, data };
  } catch (err) {
    toast.error("An unexpected error occurred.");
    throw new Error("An unexpected error occurred.");
  }
};
