<template>
  <header :class="{ animate: shouldAnimateHeader }">
    <div class="logo">
      <a :href="linkHref" :alt="linkAlt">
        <img :src="logoSrc" :alt="logoAlt" />
      </a>
    </div>
    <Navigation :active="isMenuOpen" @closeMenu="isMenuOpen = false" />
    <IconsBlock :isMenuOpen="isMenuOpen" @toggleMenu="toggleMenu" />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navigation from '../Navigation/Navigation.vue';
import IconsBlock from '../IconsBlock/IconsBlock.vue';

const isMenuOpen = ref(false);
const shouldAnimateHeader = ref(true);

const logoSrc = new URL('../../../assets/images/logo.png', import.meta.url).href;
const logoAlt = 'Logo Pipistudio';
const linkHref = '#';
const linkAlt = 'Strona główna';

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  if (window.scrollY > 50) {
    shouldAnimateHeader.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use 'Header.scss';
</style>