<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import type { Tender } from '@/types/tender'
import TenderCard from '@/components/TenderCard.vue'
import Paginator from '@/components/Paginator.vue'
import SearchForm from '@/components/SearchForm.vue'
import PageLoader from '@/components/UI/PageLoader.vue'

const tenders = ref<Tender[]>([])
const totalTenders = ref<number>(0)
const currentPage = ref<number>(1)
const searchQuery = ref<string>('')
const load = ref<boolean>(false)

const fetchTenders = async () => {
  load.value = true
  try {
    const response = await fetch(`https://api.test-webest.ru/list/?page=${currentPage.value}`)
    const data = await response.json()
    tenders.value = data.data
    tenders.value.reverse()
    totalTenders.value = data.total
    scrollToTop()
  } catch (err) {
    console.error('Ошибка загрузки тендеров:', err)
  } finally {
    load.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watchEffect(fetchTenders)

const displayedTenders = computed(() => {
  if (!searchQuery.value) return tenders.value
  const q = searchQuery.value.toLowerCase()
  return tenders.value.filter((tender) => tender.title.toLowerCase().includes(q))
})
</script>

<template>
  <section class="tenders">
    <div class="container">
      <SearchForm @search="handleSearch" />
      <PageLoader v-if="load" />
      <Transition v-else name="fade" mode="out-in">
        <div class="tenders__grid" :key="currentPage">
          <TenderCard
            v-for="tender in displayedTenders.slice(0, 30)"
            :key="tender.id"
            :tender="tender"
            :title="tender.title"
            :description="tender.description"
          />
        </div>
      </Transition>

      <Paginator
        v-if="totalTenders > 0"
        :total="totalTenders"
        :per-page="30"
        :current="currentPage"
        @change="handlePageChange"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tenders__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
