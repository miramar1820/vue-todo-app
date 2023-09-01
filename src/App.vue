<script setup>
import Navbar from './components/Navbar.vue';
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
