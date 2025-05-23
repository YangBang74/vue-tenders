<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Tender } from '@/types/tender'

const props = defineProps<{ tender: Tender }>()
const router = useRouter()

function goToDetail() {
  router.push({
    name: 'TenderDetail', // ← имя маршрута
    params: { id: props.tender.id },
    state: { tender: props.tender }, // ← передаём объект
  })
}
</script>

<template>
  <div class="tender-card" @click="goToDetail">
    <h3>{{ props.tender.title }}</h3>
    <p>{{ props.tender.description || '—' }}</p>
  </div>
</template>

<style lang="scss" scoped>
.tender-card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  max-height: 200px;
  overflow: hidden;
  padding: 1rem;
  transition: box-shadow 0.3s ease;

  &__link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &__title {
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
  }

  &__description {
    font-size: 0.95rem;
    color: #666;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>
