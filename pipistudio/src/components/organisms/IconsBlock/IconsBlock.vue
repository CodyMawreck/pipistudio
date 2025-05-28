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
      v-show="!isMobile || !isScrolled || isMenuOpen"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import IconButton from '../../atoms/IconButton/IconButton.vue';

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggleMenu']);

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024; // lub Twój breakpoint
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  handleScroll();
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});

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