<template>
  <div class="form__field">
    <VueDatePicker
      v-if="type === 'datepicker'"
      v-model="innerValue"
      :input-class="['form__field--input', { 'has-error': error }]"
      :placeholder="placeholder"
      :enable-time="true"
      :time-24hr="true"
      :disabled-dates="(date) => date < new Date()"
      @update:modelValue="handleDateUpdate"
      :dark="true"
      class="custom-datepicker"
    />

    <input
      v-else
      :type="type"
      class="form__field--input"
      :class="{ 'has-error': error }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
    />

    <div class="form__field--error">
      <small>{{ error }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: [String, Date, null],
  placeholder: String,
  error: String,
  label: String,
});

const emit = defineEmits(['update:modelValue', 'blur']);
const innerValue = ref(props.modelValue);

// Synchronizuj zmiany z zewnątrz
watch(() => props.modelValue, (val) => {
  innerValue.value = val;
});

// Emituj zmiany do rodzica
watch(innerValue, (val) => {
  emit('update:modelValue', val);
});

function onInput(event) {
  emit('update:modelValue', event.target.value);
}

function onBlur() {
  emit('blur');
}

// Specjalna obsługa daty – automatycznie oznacz jako touched
function handleDateUpdate(val) {
  innerValue.value = val;
  emit('update:modelValue', val);
  emit('blur');
}
</script>

<style lang="scss" scoped>
@use 'FormInput.scss';
</style>