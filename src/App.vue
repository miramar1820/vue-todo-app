<script setup>
import Navbar from '@/components/Navbar.vue';
import { useAuthStore } from "@/stores/user";
import { onMounted } from 'vue'

const store = useAuthStore();

// onMounted(() => {
//   store.init().then(() => {
//     console.log('init');
//   })
// })
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
@import 'bulma/css/bulma.min.css';
@import 'font-awesome/css/font-awesome.min.css';
</style>
