<template>
    <Header />
    <main>
      <section
        v-for="(section, index) in sectionComponents"
        :key="index"
        :ref="el => sectionRefs[index] = el"
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
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Header from '../components/organisms/Header/Header.vue';
import Arrow from '../components/atoms/Arrow/Arrow.vue';
import Home from '../components/sections/Home/Home.vue';
import Studio from '../components/sections/Studio/Studio.vue';
import About from '../components/sections/About/About.vue';
import Implementations from '../components/sections/Implementations/Implementations.vue';

const sectionComponents = [
  { component: Home, class: 'home' },
  { component: Studio, class: 'studio' },
  { component: About, class: 'about' },
  { component: Implementations, class: 'implementations' },
];
const sectionRefs = ref([]);  // Przechowujemy elementy DOM
const currentSectionIndex = ref(0);

let touchStartY = 0;

// Funkcja do obsługi dotyku (swipe)
const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchEndY - touchStartY;
  
  if (Math.abs(deltaY) < 50) return;

  if (deltaY < 0) {
    goToNextSection();  // Przewiń w dół
  } else {
    goToPreviousSection();  // Przewiń w górę
  }
};

// Funkcja do obsługi strzałek
const handleKeydown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault(); // zapobiega domyślnemu przewijaniu
    goToNextSection();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault(); // zapobiega domyślnemu przewijaniu
    goToPreviousSection();
  }
};

// Funkcja do obsługi scrolla
const handleWheel = (e) => {
  e.preventDefault(); // blokuje domyślne przewijanie
  if (e.deltaY > 0) {
    goToNextSection();
  } else if (e.deltaY < 0) {
    goToPreviousSection();
  }
};

// Funkcja do przewijania do konkretnej sekcji
const scrollToSection = (index) => {
  const section = sectionRefs.value[index];  // Ref dla sekcji
  if (section && section.scrollIntoView) {
    section.scrollIntoView({ behavior: 'smooth' });
    currentSectionIndex.value = index;
  }
};

// Funkcja do przejścia do poprzedniej sekcji
const goToPreviousSection = () => {
  if (currentSectionIndex.value > 0) {
    scrollToSection(currentSectionIndex.value - 1);
  }
};

// Funkcja do przejścia do następnej sekcji
const goToNextSection = () => {
  if (currentSectionIndex.value < sectionComponents.length - 1) {
    scrollToSection(currentSectionIndex.value + 1);
  }
};

// Synchronizacja przy przewijaniu ręcznym
onMounted(() => {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const index = sectionRefs.value.findIndex((section, i) => {
      const el = section;  // Bezpośredni dostęp do elementu DOM
      if (!el) return false;
      const offsetTop = el.offsetTop;
      return scrollTop >= offsetTop && scrollTop < offsetTop + el.offsetHeight;
    });
    if (index !== -1) {
      currentSectionIndex.value = index;
    }
  });

  // Obsługuje przewijanie (scroll), klawisze (strzałki) oraz swipe
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
});

// Czyszczenie listenerów przed unmountem
onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchend', handleTouchEnd);
});
</script>

<style scoped>
.bodyArrows {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

@media (max-width: 1024px) {
  .bodyArrows {
    display: none;
  }
}
</style>