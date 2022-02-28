<template>
  <div class="corpo">
    
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/cadastro">Cadastro</router-link></li>
        </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
    .corpo {
        font-family: Helvetica, Sans-Serif;
        width: 96%;
        margin: auto;
    }
</style>
