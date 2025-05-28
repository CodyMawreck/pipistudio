<template>
  <div :class="computedClasses"
    @mouseenter="onMouseEnter" 
    @mouseleave="onMouseLeave"
  >
    <p class="speaker__title">{{ speakerTitle }}</p>
    <Speaker />
    <div class="speaker__options">
      <ul>
        <p>{{ contentTitle }}</p>
        <li v-for="(option, index) in contentOption" :key="index">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Speaker from '../../../assets/icons/Speaker.svg';

const isHovered = ref(false);

const props = defineProps({
  speakerTitle: {
    type: String,
  },
  contentTitle: {
    type: String,
  },
  contentOption: {
    type: Array,
    default: () => [],
  },
  isRightSide: {
    type: Boolean,
    default: false,
  },
})

const computedClasses = computed(() => [
  props.className,
  'speaker',
  {
    'speaker__hovered': isHovered.value,
    'speaker__right':  props.isRightSide, 
  }
]);

const onMouseEnter = () => {
  isHovered.value = true;
};

const onMouseLeave = () => {
  isHovered.value = false;
};

</script>

<style lang="scss" scoped>
@use 'Speaker.scss';
</style>
