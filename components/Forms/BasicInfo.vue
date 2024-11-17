<template>
  <form class="w-full max-w-4xl mx-auto space-y-6 p-4">
    <div class="flex flex-col gap-6">
      <BaseInputText
        :model-value="localModel.firstName"
        @update:model-value="updateModel('firstName', $event)"
        label="Jméno"
        placeholder="Zadejte vaše jméno"
        :error-message="errors.firstName"
      />

      <BaseInputText
        :model-value="localModel.lastName"
        @update:model-value="updateModel('lastName', $event)"
        label="Přijmení"
        placeholder="Zadejte vaše přijmení"
        :error-message="errors.lastName"
      />

      <BaseInputText
        :model-value="localModel.email"
        @update:model-value="updateModel('email', $event)"
        label="Email"
        placeholder="email@example.com"
        :error-message="errors.email"
      />

      <BaseInputText
        :model-value="localModel.phone"
        @update:model-value="updateModel('phone', $event)"
        label="Tel. číslo"
        placeholder="777 777 777"
        :error-message="errors.phone"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
type ModelProp = Pick<
  RegisterForm,
  "firstName" | "lastName" | "email" | "phone"
>;

const props = defineProps<{
  modelValue: Readonly<ModelProp>;
}>();
const emit = defineEmits<{
  "update:modelValue": [value: ModelProp];
}>();

const { validateEmail, validatePhone } = useValidate();

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const localModel = ref<ModelProp>({ ...props.modelValue });

watchEffect(() => {
  localModel.value = { ...props.modelValue };
});

const updateModel = <K extends keyof ModelProp>(
  key: K,
  value: ModelProp[K]
) => {
  localModel.value[key] = value.trim();
  errors[key] = "";
  emit("update:modelValue", localModel.value);
};

const validate = () => {
  Object.keys(errors).forEach(
    (key) => (errors[key as keyof typeof errors] = "")
  );

  if (!localModel.value.firstName) {
    errors.firstName = "Jméno je povinné";
  }
  if (!localModel.value.lastName) {
    errors.lastName = "Přijmení je povinné";
  }

  if (!localModel.value.email) {
    errors.email = "Email je povinný";
  }

  if (!localModel.value.phone) {
    errors.phone = "Tel. číslo je povinné";
  }

  if (localModel.value.email && !validateEmail(localModel.value.email)) {
    errors.email = "Neplatný email";
  }

  if (localModel.value.phone) {
    updateModel("phone", localModel.value.phone.replace(/\s/g, ""));
    if (!validatePhone(localModel.value.phone)) {
      errors.phone = "Neplatné tel. číslo";
    }
  }

  if (Object.values(errors).some((error) => error)) {
    return false;
  }

  return true;
};

defineExpose({
  validate,
});
</script>
