<template>
  <div class="w-full max-w-2xl mx-auto p-4 space-y-6">
    <div class="flex flex-col gap-6 items-start md:items-center">
      <div class="w-full md:w-1/2">
        <BaseInputNumber
          v-model="monthlyInvestment"
          label="Pravidelná měsíční investice"
          placeholder="Zadejte měsíční investici"
          :min="min"
          :max="max"
        />
      </div>

      <div class="w-full md:w-1/2 space-y-2">
        <input
          type="range"
          v-model="monthlyInvestment"
          :min="min"
          :max="max"
          step="100"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <div class="flex justify-between text-xs text-gray-500">
          <span>{{ `${min.toLocaleString()} Kč` }}</span>
          <span>{{ `${max.toLocaleString()} Kč` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { min = 100, max = 100000 } = defineProps<{
  min?: number;
  max?: number;
}>();

const monthlyInvestment = defineModel<number>({ required: true });
</script>
