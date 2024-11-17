<template>
  <div class="w-full max-w-4xl mx-auto p-4 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseInputText
        v-model.trim="ssn"
        @update:model-value="errors.ssn = ''"
        label="Rodné číslo"
        placeholder="RRMMDD/XXXX"
        :error-message="errors.ssn"
        @input="formatSSN"
      />

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-700">
          Datum narození
        </label>
        <input
          type="date"
          v-model="birthdate"
          class="w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900 text-base transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          :class="errors.birthdate ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.birthdate" class="mt-2 text-sm text-red-600">
          {{ errors.birthdate }}
        </p>
      </div>

      <BaseInputText
        v-model.trim="idCard"
        @update:model-value="errors.idCard = ''"
        label="Číslo občanského průkazu"
        placeholder="Zadejte číslo občanského průkazu"
        :error-message="errors.idCard"
      />

      <div class="col-span-full space-y-4">
        <BaseInputText
          v-model.trim="street"
          @update:model-value="errors.street = ''"
          label="Ulice a č.p."
          placeholder="Zadejte ulici a č.p."
          :error-message="errors.street"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInputText
            v-model.trim="city"
            @update:model-value="errors.city = ''"
            label="Město"
            placeholder="Zadejte město"
            :error-message="errors.city"
          />

          <BaseInputText
            v-model.trim="zipCode"
            @update:model-value="errors.zipCode = ''"
            label="PSČ"
            placeholder="Zadejte PSČ"
            :error-message="errors.zipCode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { validateIdCard, validateZip } = useValidate();

const ssn = ref("");
const birthdate = ref("");
const idCard = ref("");
const street = ref("");
const city = ref("");
const zipCode = ref("");

const errors = reactive({
  ssn: "",
  birthdate: "",
  idCard: "",
  street: "",
  city: "",
  zipCode: "",
});

const validateCzechId = (value: string) => {
  const cleaned = value.replace(/[^\d]/g, "");

  if (cleaned.length !== 9 && cleaned.length !== 10) {
    return "Rodné číslo musí mít 9 nebo 10 číslic";
  }

  const year = parseInt(cleaned.substring(0, 2));
  let month = parseInt(cleaned.substring(2, 4));
  const day = parseInt(cleaned.substring(4, 6));

  // Adjust month (remove gender modifier)
  if (month > 70) month -= 70;
  else if (month > 50) month -= 50;
  else if (month > 20) month -= 20;

  // Validate date
  const currentYear = new Date().getFullYear() % 100;
  const fullYear = year <= currentYear ? 2000 + year : 1900 + year;

  if (month < 1 || month > 12) {
    return "Neplatný měsíc narození";
  }

  const daysInMonth = new Date(fullYear, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return "Neplatný den narození";
  }

  // Validate checksum for 10-digit numbers
  if (cleaned.length === 10) {
    const firstNine = cleaned.substring(0, 9);
    const checksum = parseInt(cleaned[9]);

    const remainder = parseInt(firstNine) % 11;
    const expectedChecksum = remainder === 10 ? 0 : remainder;

    if (checksum !== expectedChecksum) {
      return "Neplatné kontrolní číslo";
    }
  }

  return "";
};

const formatSSN = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");

  if (value.length > 10) {
    value = value.slice(0, 10);
    input.value = `${value.substring(0, 6)}/${value.substring(6)}`;
  }

  if (value.length > 6) {
    value = `${value.slice(0, 6)}/${value.slice(6)}`;
  }

  ssn.value = value;
};

const validate = () => {
  Object.keys(errors).forEach(
    (key) => (errors[key as keyof typeof errors] = "")
  );

  if (!ssn.value) {
    errors.ssn = "Rodné číslo je povinné";
  }
  if (!birthdate.value) {
    errors.birthdate = "Datum narození je povinné";
  }
  if (!idCard.value) {
    errors.idCard = "Číslo občanského průkazu je povinné";
  }
  if (!street.value) {
    errors.street = "Ulice je povinná";
  }
  if (!city.value) {
    errors.city = "Město je povinné";
  }
  if (!zipCode.value) {
    errors.zipCode = "PSČ je povinné";
  }

  if (ssn.value) {
    const ssnError = validateCzechId(ssn.value);
    if (ssnError) {
      errors.ssn = ssnError;
    }
  }

  if (zipCode.value && !validateZip(zipCode.value)) {
    errors.zipCode = "Neplatné PSČ";
  }

  if (idCard.value && !validateIdCard(idCard.value)) {
    errors.idCard = "Neplatné číslo občanského průkazu";
  }
  if (Object.values(errors).some((error) => error)) {
    return false;
  }
  return {
    ssn: ssn.value,
    birthdate: birthdate.value,
    idCard: idCard.value,
    address: {
      street: street.value,
      city: city.value,
      zipCode: zipCode.value,
    },
  };
};

defineExpose({
  validate,
});
</script>
