<template>
  <div class="form__field">
    <input
      :type="type"
      class="form__field--input"
      :class="error"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
    <div class="form__field--error">
    <small>{{ error }}</small>
  </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  placeholder: String,
  error: String
});

const emit = defineEmits(['update:modelValue']);

const onInput = ($event) => {
  emit('update:modelValue', $event.target.value);
};
</script>

<style lang="scss" scoped>
@use 'FormInput.scss';
</style>