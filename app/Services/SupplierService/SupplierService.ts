import axiosInstance from "~/lib/axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class SupplierService {
  getAll = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}supplier`,
      });
      return response.data?.suppliers;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  getSupplierPaginated = async (cursor: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}supplier-pagination?cursor=${cursor}`,
      });
      return response.data?.suppliers;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  search = async (search: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}supplier-pagination?search=${search}`,
      });
      return response.data?.suppliers;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  create = async (data: any) => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: `${API_URL}supplier`,
        data: data,
      });
      return response.data?.supplier;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };
}

export default new SupplierService();
