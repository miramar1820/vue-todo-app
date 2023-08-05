import { defineStore } from "pinia";
import {
  auth,
  authStateChanged,
  createAccountEmailPassword,
  loginAccountEmailPassword,
  loginWithGooglePopup,
  logOut,
} from "../firebase/config";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    error: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    userError: (state) => state.error,
  },
  actions: {
    init() {
      return new Promise((resolve) => {
        authStateChanged(async (user) => {
          this.user = user ? user : null;
          resolve(true);
        });
      });

      // return new Promise((resolve, reject) => {
      //   authStateChanged(async (user) => {
      //     console.log('pinia init');
      //     this.user = user ? user : null;
      //     // if (user) this.token = await getIdTokenResult(user);
      //     resolve();
      //   }, reject());
      // });
    },
    async login(email, password) {
      try {
        const response = await loginAccountEmailPassword(email, password);
        this.user = response.user ? response.user : null;
        this.error = null;
        return true;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
        return false;
      }
    },
    async createAccount(email, password) {
      try {
        const response = await createAccountEmailPassword(email, password);
        this.user = response.user ? response.user : null;
        this.error = null;
        return true;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
        return false;
      }
    },
    async logoutAccount() {
      try {
        await logOut();
        this.user = null;
        this.error = null;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
      }
    },
  },
});
