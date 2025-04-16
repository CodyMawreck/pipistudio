<template>
  <div>
    <Header />
     <main>
        <slot />
     </main>
     <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Header from '../components/organisms/Header/Header.vue'
</script>
