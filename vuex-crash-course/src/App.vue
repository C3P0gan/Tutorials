<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    "nav-bar": NavBar,
  },
};
</script>

<style>
@import "style.css";
</style>
