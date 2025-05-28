<template>
  <Header />
  <main>
    <section
      v-for="(section, index) in sectionComponents"
      :key="index"
      :ref="el => sectionRefs[index] = el"
      :id="section.id"
      :class="section.class"
    >
      <component :is="section.component" />
    </section>
  </main>
  <div class="bodyArrows">
    <Arrow
      :isDisabled="currentSectionIndex === 0"
      @onClick="goToPreviousSection"
    />
    <Arrow
      :arrowDown="true"
      :isDisabled="currentSectionIndex === sectionComponents.length - 1"
      @onClick="goToNextSection"
    />
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Header from '../components/organisms/Header/Header.vue';
import Footer from '../components/organisms/Footer/Footer.vue';
import Arrow from '../components/atoms/Arrow/Arrow.vue';
import Home from '../components/sections/Home/Home.vue';
import Studio from '../components/sections/Studio/Studio.vue';
import About from '../components/sections/About/About.vue';
import Implementations from '../components/sections/Implementations/Implementations.vue';
import Session from '../components/sections/Session/Session.vue';

const sectionComponents = [
  { component: Home, class: 'home', id: 'home' },
  { component: Studio, class: 'studio', id: 'studio' },
  { component: About, class: 'about', id: 'about' },
  { component: Implementations, class: 'implementations', id: 'implementations' },
  { component: Session, class: 'session', id: 'session' },
];

const sectionRefs = ref([]);
const currentSectionIndex = ref(0);

let touchStartY = 0;

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchEndY - touchStartY;
  if (Math.abs(deltaY) < 50) return;

  deltaY < 0 ? goToNextSection() : goToPreviousSection();
};

const handleKeydown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    goToNextSection();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    goToPreviousSection();
  }
};

const handleWheel = (e) => {
  e.preventDefault();
  e.deltaY > 0 ? goToNextSection() : goToPreviousSection();
};

const scrollToSection = (index) => {
  const section = sectionRefs.value[index];
  if (section && section.scrollIntoView) {
    section.scrollIntoView({ behavior: 'smooth' });
    currentSectionIndex.value = index;
  }
};

const goToPreviousSection = () => {
  if (currentSectionIndex.value > 0) {
    scrollToSection(currentSectionIndex.value - 1);
  }
};

const goToNextSection = () => {
  if (currentSectionIndex.value < sectionComponents.length - 1) {
    scrollToSection(currentSectionIndex.value + 1);
  }
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const index = sectionRefs.value.findIndex((section) => {
      if (!section) return false;
      const offsetTop = section.offsetTop;
      return scrollTop >= offsetTop && scrollTop < offsetTop + section.offsetHeight;
    });
    if (index !== -1) {
      currentSectionIndex.value = index;
    }
  });

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchend', handleTouchEnd);
});
</script>

<style lang="scss" scoped>
@use 'MainLayout.scss';
</style>