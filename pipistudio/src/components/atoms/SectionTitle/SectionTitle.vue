<template>
  <h2>{{ title }}</h2>
</template>

<script setup>
const props = defineProps(['title'])

</script>

<style lang="scss" scoped>
@use 'SectionTitle.scss';
</style>
