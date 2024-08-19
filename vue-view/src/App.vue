<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar/>

    <!--- render router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
