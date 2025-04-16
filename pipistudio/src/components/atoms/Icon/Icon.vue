<template>
  <div>
    <component 
      :is="icons[icon]" 
      class="icon" 
      v-if="icons[icon]" 
      :style="{ width: width, height: height }"
    />
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '32px'
  },
  height: {
    type: String,
    default: '32px'
  }
})

const icons = ref({});
const modules = import.meta.glob('../../../assets/icons/*.svg', { eager: true });

for (const path in modules) {
  const iconName = path.split('/').pop().replace('.svg', ''); // Pobieramy nazwę pliku
  icons.value[iconName] =  markRaw(modules[path].default);
}
</script>

