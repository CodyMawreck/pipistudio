<template>
  <form v-if="showForm" @submit.prevent="onSubmit" class="form">
    <FormInput
      label="Name"
      v-model="contactForm.name"
      :error="errors.name"
      placeholder="Imię i nazwisko"
      @blur="() => setTouched('name')"
    />
    <FormInput
      type="datepicker"
      label="Date"
      v-model="contactForm.date"
      :error="errors.date"
      placeholder="Data i godzina"
      @blur="() => setTouched('date')"
    />
    <FormInput
      type="email"
      label="Email"
      v-model="contactForm.email"
      :error="errors.email"
      placeholder="E-mail"
      @blur="() => setTouched('email')"
    />
    <button type="submit" :disabled="!isFormValid">
      Zapytaj o sesję
    </button>
  </form>
  <div v-if="!showForm">
    {{ successMessage }}
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { sendEmail } from '../../../services/emailService';
import FormInput from '../../organisms/Form/FormInput/FormInput.vue';

const showForm = ref(true);
const successMessage = ref('');

const initialContactForm = {
  name: '',
  date: '',
  email: '',
};

const initialtouched = {
  name: false,
  date: false,
  email: false,
};

const contactForm = reactive({ ...initialContactForm });
const touched = reactive({ ...initialtouched });

function setTouched(field) {
  touched[field] = true;
}

const errors = reactive({
  name: computed(() => (!contactForm.name && touched.name ? 'Imię i nazwisko jest wymagane' : '')),
  date: computed(() => (!contactForm.date && touched.date ? 'Data i godzina są wymagane' : '')),
  email: computed(() => {
    if(touched.email) {
      if(!contactForm.email) return 'Email jest wymagany';
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
        return 'Email jest nieprawidłowy';
      }
    }
    return '';
  }),
})

const isFormValid = computed(() => {
  const allFieldsTouched = Object.values(touched).every((t) => t);
  const noErrors = !Object.values(errors).some((e) => e);

  return allFieldsTouched && noErrors;
});

function resetForm() {
  setTimeout(() => {
    successMessage.value = '';
    showForm.value = true;
    Object.assign(contactForm, initialContactForm);
    Object.assign(touched, initialtouched);
  }, 5000);
}

async function onSubmit() {
  if (isFormValid.value) {
    const payload = {
      name: contactForm.name,
      date: contactForm.date,
      email: contactForm.email,
      subject: 'Zapytanie o sesję'
    };

    try {
      const response = await sendEmail(payload);
      if (response.status === 200) {
        successMessage.value = response.data.message;
        showForm.value = false;
        resetForm();
      } else {
        console.error('Failed to send email:', response);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  } else {
    console.log('Form is not valid');
  }
}
</script>

<style lang="scss" scoped>
@use 'Form.scss';
</style>
