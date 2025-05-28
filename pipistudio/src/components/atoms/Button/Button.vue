<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="['button', className]"
    :id="id"
    @click="onClick"
  >
  {{ text }}
  </component>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  className: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['click']);

const onClick = (event) => {
  emit('click', event);
};
</script>

<style lang="scss" scoped>
@use 'Button.scss';
</style>