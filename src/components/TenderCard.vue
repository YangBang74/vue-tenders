<template>
  <div class="tender-card" @click="goToDetail">
    <router-link :to="`/tender/${tender.id}`" class="tender-card__link">
      <h2 class="tender-card__title">{{ title }}</h2>
      <p class="tender-card__description">{{ description }}</p>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { Tender } from '@/types/tender'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  tender: Tender
  title: string
  description: string
}>()

const goToDetail = () => {
  router.push({
    path: `/tender/${props.tender.id}`,
    state: { tender: props.tender }, // Переход с передачей объекта
  })
}
</script>

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
