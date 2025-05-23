<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <input v-model="query" type="text" placeholder="Поиск по названию..." />
    <button type="submit">Найти</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const query = ref('')

function onSubmit() {
  emit('search', query.value.trim())
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
}
input {
  flex: 1;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>
