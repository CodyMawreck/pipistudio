<template>
  <form v-if="showForm" @submit.prevent="onSubmit" class="form">
    <input
      v-model="contactForm.website"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
      class="form__honeypot"
      aria-hidden="true"
    />
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
    <button type="submit" :disabled="!isFormValid || isSubmitting">
      {{ isSubmitting ? "Wysyłanie..." : "Zapytaj o sesję" }}
    </button>
    <p v-if="submitError" class="form__status form__status--error">
      {{ submitError }}
    </p>
  </form>
  <div v-if="!showForm" class="form__status form__status--success">
    {{ successMessage }}
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { sendEmail } from "../../../services/emailService";
import FormInput from "../../organisms/Form/FormInput/FormInput.vue";

const showForm = ref(true);
const successMessage = ref("");
const submitError = ref("");
const isSubmitting = ref(false);

const initialContactForm = {
  name: "",
  date: "",
  email: "",
  website: "",
  startedAt: Date.now(),
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
  name: computed(() =>
    !contactForm.name && touched.name ? "Imię i nazwisko jest wymagane" : "",
  ),
  date: computed(() =>
    !contactForm.date && touched.date ? "Data i godzina są wymagane" : "",
  ),
  email: computed(() => {
    if (touched.email) {
      if (!contactForm.email) return "Email jest wymagany";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
        return "Email jest nieprawidłowy";
      }
    }
    return "";
  }),
});

const isFormValid = computed(() => {
  const allFieldsTouched = Object.values(touched).every((t) => t);
  const noErrors = !Object.values(errors).some((e) => e);

  return allFieldsTouched && noErrors;
});

function resetForm() {
  setTimeout(() => {
    successMessage.value = "";
    submitError.value = "";
    showForm.value = true;
    Object.assign(contactForm, {
      ...initialContactForm,
      startedAt: Date.now(),
    });
    Object.assign(touched, initialtouched);
  }, 5000);
}

function formatDateTime(datetime) {
  const dateObj = new Date(datetime);

  const date = dateObj.toISOString().slice(0, 10);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return `${date} | ${time}`;
}

async function onSubmit() {
  submitError.value = "";

  if (isFormValid.value) {
    const payload = {
      name: contactForm.name,
      date: formatDateTime(contactForm.date),
      email: contactForm.email,
      subject: "Pipistudio - zapytanie o sesję",
      website: contactForm.website,
      startedAt: contactForm.startedAt,
    };

    try {
      isSubmitting.value = true;
      const response = await sendEmail(payload);
      if (response.status === 200) {
        successMessage.value = response.data.message;
        showForm.value = false;
        resetForm();
      } else {
        submitError.value =
          "Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.";
      }
    } catch (error) {
      console.error("Error sending email:", error);
      submitError.value =
        error?.response?.data?.message ||
        "Formularz nie został wysłany. Sprawdź połączenie i spróbuj ponownie.";
    } finally {
      isSubmitting.value = false;
    }
  } else {
    console.log("Form is not valid");
  }
}
</script>

<style lang="scss" scoped>
@use "Form.scss";

.form__honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}

.form__status {
  color: #fff;
  font-size: 1.8rem;
}

.form__status--error {
  color: #ff8e8e;
  text-align: left;
}
</style>
