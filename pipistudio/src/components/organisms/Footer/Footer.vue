<template>
  <footer class="footer">
    <img :src="logoSrc" :alt="logoAlt" />
    <p class="footer__text">
      @Copyright {{ currentYear }} / {{ textBeforeLink }}
      <Button
        :text="buttonText"
        :href="buttonHref"
        :alt="buttonAlt"
        class="footer__button"
      />
    </p>
    <img :src="logoSrc" :alt="logoAlt" />
  </footer>
</template>

<script setup>
import Button from '../../atoms/Button/Button.vue';

const logoSrc = new URL('../../../assets/images/logo.png', import.meta.url).href;
const logoAlt = 'Logo Pipistudio';
const currentYear = new Date().getFullYear();
const textBeforeLink = 'Projekt i wykonanie';
const buttonText = 'webmark';
const buttonHref = 'mailto:office.webmark@gmail.com';
const buttonAlt = 'Strona webmark - twórcy strony';
</script>

<style lang="scss" scoped>
@use 'Footer.scss';
</style>