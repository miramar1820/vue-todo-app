<template>
    <div>
        <h1>Register form</h1>
        <form @submit.prevent>
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <span> {{ store.error }}</span>
            <button @click="registerUser">Register</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const store = useAuthStore();
const router = useRouter();
// const { createAccount } = store;

const email = ref('')
const password = ref('')

const registerUser = async () => {
    if (await store.createAccount(email.value, password.value))
        router.replace('/login')
}


</script>
