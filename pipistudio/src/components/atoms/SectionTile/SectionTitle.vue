<template>
  <h2>{{ title }}</h2>
</template>

<script setup>
const props = defineProps(['title'])

</script>

<style scoped lang="scss">
@use '../../../assets/styles/colors' as *;
h2 {
  font-size: 9.6rem;
  color: $white;
}
</style>
