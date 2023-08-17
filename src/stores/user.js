import { defineStore } from "pinia";
import {
  auth,
  authStateChanged,
  createAccountEmailPassword,
  loginAccountEmailPassword,
  loginWithGooglePopup,
  loginWithGoogleRedirect,
  logOut,
  createUserAuth,
} from "../firebase/config";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    error: null,
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    userError: (state) => state.error,
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

      // return new Promise((resolve, reject) => {
      //   authStateChanged(async (user) => {
      //     console.log('pinia init');
      //     this.user = user ? user : null;
      //     // if (user) this.token = await getIdTokenResult(user);
      //     resolve();
      //   }, reject());
      // });
    },
    async loginGooglePopup() {
      try {
        await loginWithGooglePopup();
        return true;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
        return false;
      }
    },
    async loginGoogleRedirect() {
      try {
        await loginWithGoogleRedirect();
        return true;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
        return false;
      }
    },
    async login(email, password) {
      try {
        this.loading = true;
        const response = await loginAccountEmailPassword(email, password);
        this.user = response.user ? response.user : null;
        this.error = null;
        this.loading = false;
        return true;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async createAccount(email, password) {
      try {
        this.loading = true;
        const response = await createAccountEmailPassword(email, password);
        this.user = response.user ? response.user : null;
        this.error = null;
        this.loading = false;
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
        this.loading = true;
        await logOut();
        this.user = null;
        this.error = null;
        this.loading = false;
        return true;
      } catch (error) {
        this.user = null;
        this.error = error;
        console.log(error);
      }
    },
  },
});
