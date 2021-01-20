<template>
  <app-navbar />
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import AppNavbar from "./components/AppNavbar";

export default {
  components: {
    AppNavbar
  }
};
</script>

<style></style>
