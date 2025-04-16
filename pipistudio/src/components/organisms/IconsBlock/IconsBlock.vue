<template>
  <div class="icons">
    <IconButton
      :iconName="isMenuOpen ? 'Close' : 'Menu'"
      alt="Ikona menu"
      id="menu"
      @click="toggleMenu"
    />
    <IconButton
      v-for="(icon, index) in socialIcons"
      :key="index"
      :iconName="icon.iconName"
      :href="icon.href"
      :alt="icon.alt"
      :id="icon.id"
      :className="icon.className"
      target="_blank"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconButton from '../../atoms/IconButton/IconButton.vue';

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggleMenu']);

const socialIcons = computed(() => [
  {
    iconName: 'Instagram',
    href: 'https://www.instagram.com/pipistudiooo/',
    alt: 'Ikona Instagram',
  },
  {
    iconName: 'Youtube',
    href: 'https://www.youtube.com/@pipistudiooo',
    alt: 'Ikona Youtube',
  },
  {
    iconName: 'Facebook',
    href: 'https://www.facebook.com/pipistudio',
    alt: 'Ikona Facebook',
  },
]);

const toggleMenu = () => {
  emit('toggleMenu');
};


</script>

<style lang="scss" scoped>
@use 'IconsBlock.scss';
</style>