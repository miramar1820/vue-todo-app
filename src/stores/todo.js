import { defineStore } from "pinia";
import { useAuthStore } from "./user";

import {
  createTodo,
  fetchAllTodosForUser,
  removeDoc,
  updateTodo,
  changeStatusTodo,
} from "../firebase/config";

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
    isLoading: (state) => state.loadingTodos,
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
        console.log("fetchtodos", this.todos);
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
          await this.fetchTodos();

          return true;
        } catch (error) {
          console.log(error.message);
          return false;
        }
      }
    },
    async removeTodo(id) {
      // console.log(id);
      await removeDoc(id);
      await this.fetchTodos();
      return true;
    },
    async changeTodo(id, title) {
      // console.log(id);
      await updateTodo(id, title);
      await this.fetchTodos();
    },
    async finishTodo(id) {
      await changeStatusTodo(id);
      await this.fetchTodos();
    },
  },
});
