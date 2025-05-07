<template>
  <Headline class="home__headline" />
  <Arrow
    :isDownBouncing="true"
    class="home__arrow"
  />
  <Microphone 
    class="home__icon" 
    height="10rem" 
  />
</template>

<script setup>
import Headline from '../../atoms/Headline/Headline.vue';
import Microphone from '../../../assets/icons/Microphone.svg';
import Arrow from '../../atoms/Arrow/Arrow.vue'
</script>

<style lang="scss">
@use 'Home.scss';
</style>
