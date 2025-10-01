import axiosInstance from "~/lib/axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class ItemMasterService {
  create = async (data: any) => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: `${API_URL}item-master`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.item;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  getAll = async (cursor: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: cursor
          ? `${API_URL}item-master?cursor=${cursor}`
          : `${API_URL}item-master`,
      });
      return response.data.items;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw e;
    }
  };

  search = async (search: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}item-master?search=${search}`,
      });
      return response.data?.items;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };
}

export default new ItemMasterService();
