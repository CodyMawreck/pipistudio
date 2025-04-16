<template>
  <div
  :isDisabled="isDisabled"
  :arrowDown="arrowDown"
  :class="computedClasses"
  :isDownBouncing="isDownBouncing"
  @click="onClick"
  >
    {{ arrow }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  arrow: {
    type: String,
    default: '->',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  arrowDown: {
    type: Boolean,
    default: false,
  },
  isDownBouncing: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['onClick']);

const onClick = (event) => {
  emit('onClick', event);
};

const computedClasses = computed(() => [
  props.className,
  {
    arrow: true,
    'arrow--disabled': props.isDisabled,
    'arrow--bouncing': props.isDownBouncing,
    'arrow--down': props.arrowDown
  }
]);


</script>

<style lang="scss" scoped>
@use 'Arrow.scss';
</style>



