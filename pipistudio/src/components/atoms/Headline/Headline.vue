<template>
  <h1>
    <div class="topText">
      <p class="mix">{{ mixText }}</p>
      <p class="slash">{{ slashText }}</p>
    </div>
    <div class="bottomText">
      <p class="master">{{ masteringText }}</p>
      <div class="implementationWrapper">
        <p class="implementation">{{ implementationText }}</p>
        <p class="dot">{{ dotText }}</p>
      </div>
    </div>
  </h1>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
@use 'headline.scss';
</style>
