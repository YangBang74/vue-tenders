<template>
  <div class="paginator">
    <button :disabled="current === 1" @click="change(current - 1)">← Назад</button>

    <span>Страница {{ current }} из {{ totalPages }}</span>

    <button :disabled="current === totalPages" @click="change(current + 1)">Вперёд →</button>
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
