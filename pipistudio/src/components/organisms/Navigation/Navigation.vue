<template>
  <nav :class="computedClasses">
    <Button
      v-for="(link, index) in navLinks"
      :key="index"
      :href="link.href"
      :alt="link.alt"
      :text="link.text"
      @click="closeMenu"
    />
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import Button from '../../atoms/Button/Button.vue';

const emit = defineEmits(['update:mobileActive']);

const props = defineProps({
  mobileActive: {
    type: Boolean,
    default: false
  },
  navLinks: {
    type: Array,
    default: () => [
      { href: '#studio', text: 'Studio', alt: 'Sekcja studio' },
      { href: '#about', text: 'O mnie', alt: 'Sekcja o mnie' },
      { href: '#implementations', text: 'Realizacje', alt: 'Sekcja realizacje' },
      { href: '#session', text: 'Umów sesję', alt: 'Sekcja sesja' },
    ]
  },
});

const computedClasses = computed(() => [
  props.className,
  'navigation',
  {
    'navigation--mobileActive': props.mobileActive,
    'navigation--mobileInactive': !props.mobileActive, 
  }
]);

const closeMenu = () => {
  emit('update:mobileActive', false);
};

</script>

<style lang="scss" scoped>
@use 'Navigation.scss';
</style>