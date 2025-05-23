<template>
  <section class="tender-detail" v-if="tender">
    <h1>{{ tender.title }}</h1>
    <p>{{ tender.description }}</p>

    <button @click="goBack">Назад</button>
  </section>
  <p v-else>Загрузка...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Tender } from '@/types/tender'

const route = useRoute()
const router = useRouter()

const tender = ref<Tender | null>(null)

const fetchTender = async (id: string) => {
  try {
    const res = await fetch(`https://api.test-webest.ru/list/?page=1/date/${id}`)
    if (!res.ok) throw new Error('Ошибка загрузки тендера')

    tender.value = await res.json()
    console.log(tender.value)
  } catch (err) {
    console.error(err)
    tender.value = null
  }
}

onMounted(() => {
  const id = route.params.id as string
  fetchTender(id)
})

const goBack = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.tender-detail {
  max-width: 800px;
  margin: 2rem auto;

  h1 {
    font-size: 2rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
}
</style>
