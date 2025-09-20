import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import axiosInstance from "~/lib/axios";

const authStore = (set: any) => ({
  isLoggedIn: true,
  loading: false,
  user: null,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("user");
      set({
        isLoggedIn: true,
        user: res.data,
        loading: false,
      });
      return res.data;
    } catch (e) {
      set({
        isLoggedIn: false,
        user: null,
        loading: false,
      });
      return null;
    }
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useAuthStore;
