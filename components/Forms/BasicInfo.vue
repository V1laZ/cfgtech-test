<template>
  <form class="w-full max-w-4xl mx-auto space-y-6 p-4">
    <div class="flex flex-col gap-6">
      <BaseInputText
        v-model.trim="firstName"
        label="Jméno"
        placeholder="Zadejte vaše jméno"
        :error-message="errors.firstName"
        @update:model-value="errors.firstName = ''"
      />

      <BaseInputText
        v-model.trim="lastName"
        label="Přijmení"
        placeholder="Zadejte vaše přijmení"
        :error-message="errors.lastName"
        @update:model-value="errors.lastName = ''"
      />

      <BaseInputText
        v-model.trim="email"
        label="Email"
        placeholder="email@example.com"
        :error-message="errors.email"
        @update:model-value="errors.email = ''"
      />

      <BaseInputText
        v-model.trim="phone"
        label="Tel. číslo"
        placeholder="777 777 777"
        :error-message="errors.phone"
        @update:model-value="errors.phone = ''"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
const { validateEmail, validatePhone } = useValidate();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const validate = () => {
  if (!firstName.value) {
    errors.firstName = "Jméno je povinné";
  }
  if (!lastName.value) {
    errors.lastName = "Přijmení je povinné";
  }

  if (!email.value) {
    errors.email = "Email je povinný";
  }

  if (!phone.value) {
    errors.phone = "Tel. číslo je povinné";
  }

  if (email.value && !validateEmail(email.value)) {
    errors.email = "Neplatný email";
  }

  if (phone.value) {
    phone.value = phone.value.replace(/\s/g, "");
    if (!validatePhone(phone.value)) {
      errors.phone = "Neplatné tel. číslo";
    }
  }

  if (Object.values(errors).some((error) => error)) {
    return false;
  }

  return {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
  };
};

defineExpose({
  validate,
});
</script>
