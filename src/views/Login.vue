<template>
    <div class="is-flex fullheight is-align-items-center">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                    <form @submit.prevent="loginUser" class="box">
                        <div class="field">
                            <h1 class="title is-4 centered">Login</h1>
                        </div>
                        <div class="field">
                            <label for="" class="label">Email</label>
                            <div class="control has-icons-left">
                                <input type="email" v-model="email" placeholder="e.g. bobsmith@gmail.com" class="input"
                                    required>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="label">Password</label>
                            <div class="control has-icons-left">
                                <input type="password" v-model="password" placeholder="*******" class="input" required>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div class="error">
                            <span class="is-danger"> {{ store.error ?
                                store.error : '' }}</span>
                        </div>
                        <!-- <progress v-if="store.loading" class="progress is-small is-primary" max="100">15%</progress> -->
                        <!-- <span>{{ store.loading }}</span> -->
                        <!-- <div class="field">
                                <label for="" class="checkbox">
                                    <input type="checkbox">
                                    Remember me
                                </label>
                            </div> -->
                        <div class="field mt-5">
                            <button class="button is-success is-fullwidth" :class="store.loading ? 'is-loading' : ''">
                                <span class="icon">
                                    <i class="fa fa-sign-in"></i>
                                </span>
                                <span>Login</span>
                            </button>
                        </div>
                        <div class="field centered">
                            <div class="is-size-7">
                                Don't have an account?
                                <RouterLink to="/register" class="link"> Register </RouterLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const store = useAuthStore();
const router = useRouter();
const { login, isLoading } = store;

const email = ref('')
const password = ref('')

const loginUser = async () => {
    if (await login(email.value, password.value))
        router.replace('/dashboard')
}


</script>

<style>
.centered {
    text-align: center;
}
.fullheight {
    flex: 1 0 auto
}
</style>