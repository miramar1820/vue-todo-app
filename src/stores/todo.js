import { defineStore } from "pinia";
import { useAuthStore } from "./user";

import { authStateChanged } from "../firebase/config";

export const useTodosStore = defineStore("todosStore", {
  state: () => ({
    todos: [],
    error: null,
    loading: false,
  }),
  getters: {
    todosError: (state) => state.error,
    isLoading: (state) => state.loading,
  },
  actions: {
    init() {
      return new Promise((resolve) => {
        authStateChanged(async (user) => {
          this.user = user ? user : null;
          if (user) {
            await createUserAuth(user);
          }
          resolve(true);
        });
      });
    },
  },
});
