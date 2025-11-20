import axiosInstance from "~/lib/axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class CustomerService {
  getAll = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}customer`,
      });
      return response.data.customers;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  getAllPaginated = async (cursor: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}customer-pagination?cursor=${cursor}`,
      });
      return response.data?.customers;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  search = async (search: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}customer-pagination?search=${search}`,
      });
      return response.data?.customers;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  create = async (data: any) => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: `${API_URL}customer`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.customer;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };
}

export default new CustomerService();
