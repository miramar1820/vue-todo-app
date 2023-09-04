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
  <Navbar />
  <RouterView />
</template>

<style lang="scss">
@charset "utf-8";
// $primary: #333333;
$progress-border-radius: initial;
@import "bulma/bulma.sass";
@import 'font-awesome/css/font-awesome.min.css';
// @import 'bulma/css/bulma.min.css';
</style>
