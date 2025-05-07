<template>
  <SectionTitle 
    title="Realizacje" 
    class="title"
  />
  <div class="implementations__wrapper">
    <iframe 
      style="border-radius:12px" 
      src="https://open.spotify.com/embed/playlist/1HhrmopdYXB6D7JkJSAsiq?utm_source=generator&theme=0" 
      frameBorder="0" 
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy"
      class="spotify"
    />
  </div>

</template>

<script setup>
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.vue';
</script>

<style lang="scss">
@use 'Implementations.scss';
</style>
