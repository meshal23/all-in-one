import axiosInstance from "~/lib/axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class ItemCategoryService {
  getAll = async (cursor: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: cursor
          ? `${API_URL}item-category?cursor=${cursor}`
          : `${API_URL}item-category`,
      });
      return response.data.categories;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      return error;
    }
  };

  create = async (data: any) => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: `${API_URL}item-category`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.category;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };

  search = async (search: string | null = null) => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}item-category?search=${search}`,
      });
      return response.data?.categories;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      throw error;
    }
  };
}

export default new ItemCategoryService();
