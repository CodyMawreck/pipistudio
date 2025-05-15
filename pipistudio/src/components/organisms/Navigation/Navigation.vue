<template>
  <nav :class="computedClasses">
    <Button
      v-for="(link, index) in navLinks"
      :key="index"
      :href="link.href"
      :alt="link.alt"
      :text="link.text"
      :class="{ currentSection: currentSection === link.href.replace('#', '') }"
      @click.prevent="handleClick(link.href)"
    />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import Button from '../../atoms/Button/Button.vue';

const emit = defineEmits(['closeMenu']);

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  navLinks: {
    type: Array,
    default: () => [
      { href: '#home', text: 'Home', alt: 'Home' },
      { href: '#studio', text: 'Studio', alt: 'Sekcja studio' },
      { href: '#about', text: 'O mnie', alt: 'Sekcja o mnie' },
      { href: '#implementations', text: 'Realizacje', alt: 'Sekcja realizacje' },
      { href: '#session', text: 'Umów sesję', alt: 'Sekcja sesja' },
    ]
  },
});

const currentSection = ref('home');

const computedClasses = computed(() => [
  'navigation',
  {
    'navigation--active': props.active,
  }
]);

const handleClick = (href) => {
  emit('closeMenu');
  const targetId = href.replace('#', '');
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const updateCurrentSection = () => {
  const sections = props.navLinks.map(link => document.getElementById(link.href.replace('#', '')));
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section, index) => {
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection.value = props.navLinks[index].href.replace('#', '');
      }
    }
  });
};

watch(() => props.active, (isActive) => {
  if (isActive) {
    document.body.classList.add('noScroll');
  } else {
    document.body.classList.remove('noScroll');
  }
});

onMounted(() => {
  window.addEventListener('scroll', updateCurrentSection);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateCurrentSection);
});
</script>

<style lang="scss" scoped>
@use 'Navigation.scss';
</style>