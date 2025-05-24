<template>
  <PageLoader v-if="isLoading" />
  <div>
    <div class="container">
      <section class="tender-detail" v-if="tender">
        <h1>{{ tender.title }}</h1>
        <div class="genres">
          <span class="genre">
            {{ tender.category }}
          </span>
        </div>
        <p>{{ tender.description }}</p>
        <router-link to="/">
          <button type="button">Назад</button>
        </router-link>
      </section>
      <p v-if="error">
        Не найдены данные тендера. <router-link to="/">Вернуться к списку</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import PageLoader from '@/components/UI/PageLoader.vue'
import { ref, onMounted, defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  id: String,
})

const tender = ref(null)
const isLoading = ref(false)
const error = ref(null)

async function fetchTender(id) {
  isLoading.value = true
  try {
    const res = await fetch(`https://api.test-webest.ru/element/?id=${id}`)
    if (!res.ok) throw new Error('Ошибка сети')
    tender.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTender(props.id)
})
</script>

<style lang="scss" scoped>
.tender-detail {
  margin: 2rem auto;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  button {
    background-color: #000;
    color: #fff;

    margin-top: 2rem;
    padding: 0.5rem 3rem;
    cursor: pointer;
  }
}
.genres {
  margin: 20px 0 25px;
  .genre {
    background-color: #e9e9e9;
    padding: 0.3125rem 0.625rem;
    border-radius: 10px;
  }
}
</style>
