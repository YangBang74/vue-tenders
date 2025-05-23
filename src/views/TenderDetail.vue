<template>
  <section class="tender-detail" v-if="tender">
    <h1>{{ tender.title }}</h1>
    <p>{{ tender.description }}</p>
    <!-- Остальные поля из tender … -->

    <button @click="goBack">Назад</button>
  </section>

  <p v-else>Не найдены данные тендера. <router-link to="/">Вернуться к списку</router-link></p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Tender } from '@/types/tender'

const route = useRoute()
const router = useRouter()
const tender = ref<Tender | null>(null)

onMounted(() => {
  // Vue сохраняет state при переходе через router.push(...)
  const stateTender = window.history.state?.tender as Tender | undefined

  if (stateTender) {
    tender.value = stateTender
  } else {
    // Если попали напрямую (например, F5) — редирект на список
    router.replace({ name: 'TenderList' })
  }
})

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.tender-detail {
  max-width: 800px;
  margin: 2rem auto;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
}
</style>
