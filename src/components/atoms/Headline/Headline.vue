<template>
  <h1>
    <div class="topText">
      <p class="mix" :class="{ animate: shouldAnimate }">{{ mixText }}</p>
      <p class="slash" :class="{ animate: shouldAnimate }">{{ slashText }}</p>
    </div>
    <div class="bottomText">
      <p class="master" :class="{ animate: shouldAnimate }">{{ masteringText }}</p>
      <div class="implementationWrapper">
        <p class="implementation" :class="{ animate: shouldAnimate }">{{ implementationText }}</p>
        <p class="dot" :class="{ animate: shouldAnimate }">{{ dotText }}</p>
      </div>
    </div>
  </h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  mixText: {
    type: String,
    default: 'Mix' 
  },
  slashText: {
    type: String,
    default: '/' 
  },
  masteringText: {
    type: String,
    default: 'Mastering'
  },
  implementationText: {
    type: String,
    default: 'Realizacja' 
  },
  dotText: {
    type: String,
    default: '.' 
  }
})

const shouldAnimate = ref(false);

onMounted(() => {
  if (window.scrollY === 0) {
    shouldAnimate.value = true;
  }
});

</script>

<style lang="scss" scoped>
@use 'headline.scss';
</style>
