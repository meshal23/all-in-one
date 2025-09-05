import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import axiosInstance from "~/lib/axios";

const authStore = (set: any) => ({
  isLoggedIn: false,
  loading: false,
  fetchUser: async () => {
    set({ loading: true });
    const res = await axiosInstance
      .get("user")
      .then(() => set({ isLoggedIn: true }))
      .catch((e) => {
        set({ isLoggedIn: false });
        return e;
      });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useAuthStore;
