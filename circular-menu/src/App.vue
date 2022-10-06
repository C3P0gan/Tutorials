<template>
  <div id="app">
    <div class="menu">
      <div class="toggle">
        <ion-icon name="add-outline"></ion-icon>
      </div>
      <li style="--i: 0">
        <a href="#"><ion-icon name="home-outline"></ion-icon></a>
      </li>
      <li style="--i: 1">
        <a href="#"><ion-icon name="person-outline"></ion-icon></a>
      </li>
      <li style="--i: 2">
        <a href="#"><ion-icon name="settings-outline"></ion-icon></a>
      </li>
      <li style="--i: 3">
        <a href="#"><ion-icon name="mail-outline"></ion-icon></a>
      </li>
      <li style="--i: 4">
        <a href="#"><ion-icon name="key-outline"></ion-icon></a>
      </li>
      <li style="--i: 5">
        <a href="#"><ion-icon name="videocam-outline"></ion-icon></a>
      </li>
      <li style="--i: 6">
        <a href="#"><ion-icon name="game-controller-outline"></ion-icon></a>
      </li>
      <li style="--i: 7">
        <a href="#"><ion-icon name="camera-outline"></ion-icon></a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  methods: {
    toggleActive() {
      let toggle = document.querySelector(".toggle");
      let menu = document.querySelector(".menu");

      toggle.onclick = function () {
        menu.classList.toggle("active");
      };
    },
  },
  mounted() {
    let ionIconsModule = document.createElement("script");
    ionIconsModule.setAttribute(
      "src",
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    );
    document.head.appendChild(ionIconsModule);

    let ionIconsNoModule = document.createElement("script");
    ionIconsNoModule.setAttribute(
      "src",
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    );
    document.head.appendChild(ionIconsNoModule);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #8460ed, #ff1252);
}

.menu {
  position: relative;
  width: 200px;
  height: 200px;
  background: #0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu li {
  position: absolute;
  list-style: none;
}

.toggle {
  position: absolute;
  width: 60px;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  font-size: 2em;
}
</style>
