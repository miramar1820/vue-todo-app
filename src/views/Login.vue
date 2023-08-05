<template>
    <section class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form @submit.prevent class="box">
                            <div class="field">
                                <label for="" class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input type="email" v-model="email"
                                        placeholder="e.g. bobsmith@gmail.com"
                                        class="input" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" v-model="password"
                                        placeholder="*******" class="input"
                                        required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="error">
                                <span class="is-danger"> {{ store.error ?
                                    store.error : '' }}</span>
                            </div>
                            <!-- <div class="field">
                                <label for="" class="checkbox">
                                    <input type="checkbox">
                                    Remember me
                                </label>
                            </div> -->
                            <div class="field">
                                <button @click="loginUser"
                                    class="button is-success">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const store = useAuthStore();
const router = useRouter();
const { login } = store;

const email = ref('')
const password = ref('')

const loginUser = async () => {
    if (await login(email.value, password.value))
        router.replace('/dashboard')
}


</script>
