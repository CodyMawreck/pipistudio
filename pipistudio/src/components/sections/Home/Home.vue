<template>
  <section>
    <Headline class="headline" />
    <Arrow
      :isDownBouncing="true" 
     />
    <Microphone class="icon" height="10rem" />
  </section>
</template>

<script setup>
import Headline from '../../atoms/Headline/Headline.vue';
import Microphone from '../../../assets/icons/Microphone.svg';
import Arrow from '../../atoms/Arrow/Arrow.vue'

</script>

<style lang="scss" scoped>
@use 'Home.scss';
</style>
