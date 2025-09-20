import ItemBrandService from "~/Services/ItemBrandService/ItemBrandService";
import ItemCategoryService from "~/Services/ItemCategoryService/ItemCategoryService";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const loadItemCategoryOptions = async () => {
  try {
    const response = await ItemCategoryService.getAll();
    console.log(response);

    return response?.map((category: any) => {
      return { value: category.code, label: category.name };
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    return error;
  }
};

export const loadItemBrandOptions = async () => {
  try {
    const response = await ItemBrandService.getAll();

    return response?.map((brand: any) => {
      return { value: brand.code, label: brand.name };
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    return error;
  }
};
