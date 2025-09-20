import axiosInstance from "~/lib/axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class ItemBrandService {
  getAll = async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: `${API_URL}item-brand`,
      });
      return response.data.brands;
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      return error;
    }
  };
}

export default new ItemBrandService();
