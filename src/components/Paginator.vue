<template>
  <div class="paginator">
    <button :disabled="current === 1" @click="change(current - 1)">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12H18M6 12L11 7M6 12L11 17"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Prev
    </button>

    <span>Page {{ current }} from {{ totalPages }}</span>

    <button :disabled="current === totalPages" @click="change(current + 1)">
      Next
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12H18M18 12L13 7M18 12L13 17"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// ✅ Деструктурируем пропсы
const props = defineProps<{
  total: number
  perPage: number
  current: number
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

// ✅ Используем props внутри вычисления
const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const change = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('change', page)
  }
}
</script>
<style lang="scss" scoped>
.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    svg {
      width: 1rem;
      height: 1rem;
      fill: currentColor; // Используем текущий цвет текста
    }
  }

  span {
    font-size: 0.875rem;
    color: #333;
  }
}
</style>
