<script setup>
// import { auth } from '@/firebase/config'
</script>

<template>
  <section class="hero is-medium">

    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div class="hero-body">
      <div class="container">
        <div class="content">
          <p class="title is-info is-size-1-desktop is-size-3-mobile">
            Hello
          </p>
          <p class="subtitle is-size-3-desktop">
            My name is Miras, I am frontend developer, and this is my todo list project on Vue3
            <!-- {{ auth.currentUser }} -->
          </p>
          <RouterLink to="/dashboard" class="button is-rounded is-primary is-outlined">
            <span has-text-weight-bold>Go to Todos dashboard</span>
            <span class="icon">
              <i class="fa fa-arrow-right"></i>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>


  </section>
</template>

<style lang="scss" scoped>
.hero {
  flex: 1;
}

.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
  bottom: 0;
  left: -50%;
  opacity: .5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.bg3 {
  animation-duration: 5s;
}

.content {
  background-color: rgba(255, 255, 255, .8);
  border-radius: .25em;
  box-shadow: 0 0 .25em rgba(0, 0, 0, .25);
  // left: 50%;
  padding: 10vmin;
  // position: fixed;
  text-align: center;
  // top: 50%;
  // transform: translate(-50%, -50%);
}

h1 {
  font-family: monospace;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}
</style>