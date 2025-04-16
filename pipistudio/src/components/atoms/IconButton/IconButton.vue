<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="['icon-button', className]"
    :id="id"
    @click="onClick"
  >
    <Icon :icon="iconName" />
  </component>
</template>

<script setup>
import Icon from '../Icon/Icon.vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
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
@use 'IconButton.scss';
</style>