<template>
    <div class="is-flex fullheight is-align-items-center">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                    <div class="box">
                        <div class="block">
                            <h1 class="title is-4 has-text-centered">Login</h1>
                        </div>
                        <div class="mb-3">
                            <button class="button is-outlined is-fullwidth"
                                @click="googleLoginRedirect"
                                :disabled="store.loading">
                                <span class="icon">
                                    <i class="fa fa-google"></i>
                                </span>
                                <span>Login with Google</span>
                            </button>
                        </div>
                        <div class="mb-3 has-text-centered">
                            <span>or</span>
                        </div>
                        <form @submit.prevent="loginUser">
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input type="text" v-model="form.email"
                                        placeholder="e.g. bobsmith@gmail.com"
                                        class="input" :class="emailClass"
                                        @blur="v$.email.$touch">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" v-model="form.password"
                                        placeholder="*******" class="input"
                                        :class="passwordClass"
                                        @blur="v$.password.$touch">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div v-if="store.error" class="has-text-centered">
                                <span class="has-text-danger"> {{
                                    store.error }}</span>
                            </div>
                            <div v-if="v$.$error"
                                class="notification is-danger is-light">
                                Please fill form.
                            </div>
                            <!-- <progress v-if="store.loading" class="progress is-small is-primary" max="100">15%</progress> -->
                            <!-- <span>{{ store.loading }}</span> -->
                            <!-- <div class="field">
                                <label class="checkbox">
                                    <input type="checkbox">
                                    Remember me
                                </label>
                            </div> -->
                            <div class="field mt-5">
                                <button class="button is-success is-fullwidth"
                                    :class="{ 'is-loading': store.loading }">
                                    <span class="icon">
                                        <i class="fa fa-sign-in"></i>
                                    </span>
                                    <span>Login</span>
                                </button>
                            </div>
                            <div class="field has-text-centered">
                                <div class="is-size-7">
                                    Don't have an account?
                                    <RouterLink to="/register" class="link">
                                        Register
                                    </RouterLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, minLength } from '@vuelidate/validators'


const store = useAuthStore();
const router = useRouter();
const { login, loginGoogleRedirect, reset } = store;

reset();

const form = reactive({
    email: '',
    password: ''
})

const rules = {
    email: { required, email: emailValidator },
    password: { required }
}



const v$ = useVuelidate(rules, form)


const emailClass = computed(() => ({
    'is-danger': v$.value.email.$error
}))
const passwordClass = computed(() => ({
    'is-danger': v$.value.password.$error
}))

// console.log(v$.value.email);

const loginUser = async () => {
    const valid = await v$.value.$validate();
    if (!valid) return;
    if (await login(form.email, form.password))
        router.replace('/dashboard')
}

const googleLoginRedirect = async () => {
    if (await loginGoogleRedirect())
        router.push('/dashboard')
}

</script>

<style>
.fullheight {
    height: 90%;
}
</style>