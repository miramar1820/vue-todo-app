<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue';
import { useAuthStore } from "@/stores/user";
const userStore = useAuthStore();
onMounted(() => {
  userStore.init();
})

</script>

<template>
  <div class="wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>

