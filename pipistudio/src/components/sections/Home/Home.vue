<template>
  <Headline class="home__headline" />
  <Arrow
    class="home__arrow"
    @onClick="handleArrowClick"
    :arrowDown="true"
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

const emit = defineEmits(['goToNextSection']);

function handleArrowClick() {
  emit('goToNextSection');
}
</script>

<style lang="scss">
@use 'Home.scss';
</style>
