import { defineStore } from "pinia";
import { useAuthStore } from "./user";

import { createTodo, fetchAllTodosForUser } from "../firebase/config";

export const useTodosStore = defineStore("todosStore", {
  state: () => ({
    todos: [],
    error: null,
    loading: false,
    userLoggedIn: useAuthStore().isLoggedIn,
  }),
  getters: {
    todosError: (state) => state.error,
    isLoading: (state) => state.loading,
  },
  actions: {
    init() {
      const user = this.userStore;
      console.log(user);
    },

    async fetchTodos() {
      console.log('fetchTodos exposed');
      this.todos = await fetchAllTodosForUser();
    },
    async addTodo(todo) {
      if (this.userLoggedIn) {
        try {
          await createTodo(todo);
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
});
