<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Tender } from '@/types/tender'

const props = defineProps<{ tender: Tender }>()
</script>

<template>
  <div class="card">
    <router-link :to="{ name: 'TenderDetails', params: { id: tender.id } }" class="card-title">
      {{ props.tender.title }}
    </router-link>
    <p class="card__description">{{ props.tender.description || '—' }}</p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: #fff;
  border: 1px solid #ccc;
  max-height: 400px;
  overflow: hidden;
  padding: 0.625rem;
  transition: box-shadow 0.2s ease;
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
    font-size: 0.875rem;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 6; // ограничиваем 3 строками
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
}
</style>
