<template>
    <div>
        {{ store.user ? store.user : 'nope' }}
        <hr>
        {{ store.isLoggedIn }}
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const store = useAuthStore();
const router = useRouter();
console.log('dashboard');
</script>
