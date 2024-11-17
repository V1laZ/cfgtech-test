<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="id"
        v-model="modelValue"
        :placeholder="placeholder"
        class="w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900 text-base transition duration-200 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed peer"
        :class="[
          errorMessage
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300',
        ]"
      />
    </div>

    <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}>();

const modelValue = defineModel<string>({ default: "" });

const id = useId();
</script>
