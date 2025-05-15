<template>
  <header>
    <div class="logo">
      <a href="#" alt="Strona główna">
        <img src="../../../assets/images/logo.png" alt="Logo Pipistudio" />
      </a>
    </div>
    <Navigation :active="isMenuOpen" @closeMenu="isMenuOpen = false" />
    <IconsBlock :isMenuOpen="isMenuOpen" @toggleMenu="toggleMenu" />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '../Navigation/Navigation.vue';
import IconsBlock from '../IconsBlock/IconsBlock.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style lang="scss" scoped>
@use 'Header.scss';
</style>