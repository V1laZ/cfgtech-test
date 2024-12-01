<template>
  <div class="min-h-screen flex items-center bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto w-full">
      <div class="max-w-4xl mx-auto mb-8 px-8">
        <div class="hidden sm:flex justify-between">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="flex-col flex items-center justify-center gap-2"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                :class="[
                  currentStep >= index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600',
                ]"
              >
                {{ index + 1 }}
              </div>
            </div>
            <div>
              {{ step.title }}
            </div>
          </div>
        </div>
        <div class="sm:hidden flex justify-center items-center gap-2 flex-col">
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-500 text-white"
            >
              {{ currentStep + 1 }}
            </div>
          </div>
          <div>
            {{ steps[currentStep].title }}
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div v-if="currentStep === 0">
          <FormsInvestValue v-model="form.monthlyInvest" />
        </div>
        <div v-else-if="currentStep === 1">
          <FormsBasicInfo
            ref="basicInfo"
            :model-value="form"
            @update:model-value="form = { ...form, ...$event }"
          />
        </div>
        <div v-else-if="currentStep === 2">
          <FormsIdentification
            ref="identification"
            :model-value="form"
            @update:model-value="form = { ...form, ...$event }"
          />
          <div class="mt-4">
            <label>
              <input type="checkbox" v-model="gdprCheck" />
              <span class="text-gray-800 ml-2"
                >Souhlasím se zpracováním osobních údajů</span
              >
            </label>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Předchozí
          </button>

          <button
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="ml-auto px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Další
          </button>

          <button
            v-if="currentStep === steps.length - 1"
            @click="submitForm"
            :disabled="!gdprCheck"
            class="ml-auto px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-green-500"
          >
            Odeslat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const basicInfo = useTemplateRef("basicInfo");
const identification = useTemplateRef("identification");

const currentStep = ref(0);
const gdprCheck = ref(false);
const form = ref<RegisterForm>({
  monthlyInvest: 150,
  street: "",
  city: "",
  zipCode: "",
  birthdate: "",
  email: "",
  firstName: "",
  idCard: "",
  lastName: "",
  phone: "",
  ssn: "",
  iban: "",
});

const steps = [
  {
    title: "Investice",
  },
  {
    title: "Základní údaje",
  },
  {
    title: "Identifikace",
  },
];

const nextStep = () => {
  if (currentStep.value === 1 && !basicInfo.value?.validate()) {
    return;
  }

  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const submitForm = () => {
  if (!identification.value?.validate()) {
    return;
  }
  // Code to submit the form ($fetch POST request)
};
</script>
