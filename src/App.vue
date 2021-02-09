<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    window.qualities = {
      relationships: { value: 50, delta: 5 },
      intelligence: { value: 10, delta: 2 },
      health: { value: 17, delta: 1 },
      happiness: { value: 77, delta: 10 },
      leadership: { value: 4, delta: 2 },
    };
  },
};
</script>

<style>
#app {
  max-width: 450px;
  margin: 0 auto;

  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 17px;
}
</style>
