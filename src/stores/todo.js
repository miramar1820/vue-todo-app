import { defineStore } from "pinia";
import { useAuthStore } from "./user";

import { createTodo, fetchAllTodosForUser } from "../firebase/config";

export const useTodosStore = defineStore("todosStore", {
  state: () => ({
    todos: [],
    error: null,
    loadingTodos: false,

    userLoggedIn: useAuthStore().isLoggedIn,
  }),
  getters: {
    todosEmpty: (state) => state.todos.length === 0,
    todosError: (state) => state.error,
    isLoading: (state) => state.loading,
  },
  actions: {
    init() {
      const user = this.userStore;
      console.log(user);
    },

    async fetchTodos() {
      this.loadingTodos = true;
      console.log("fetchTodos exposed");
      try {
        this.todos = await fetchAllTodosForUser();
        this.loadingTodos = false;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingTodos = false;
      }
    },
    async addTodo(todo) {
      if (this.userLoggedIn) {
        try {
          await createTodo(todo);
          return true;
        } catch (error) {
          console.log(error.message);
          return false;
        }
      }
    },
    async removeTodo(id) {
      
    }
  },
});
