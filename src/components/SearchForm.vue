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
  margin: 10px 0;
  display: flex;
}
input {
  background-color: rgb(236, 236, 236);
  width: 100%;
  flex: 1;
  padding: 0.5rem;
  height: 40px;
}
button {
  height: 40px;
  background-color: #000;
  color: #fff;
  width: 20%;
  padding: 0.5rem 1rem;
}
</style>
