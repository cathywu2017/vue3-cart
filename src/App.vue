<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const cartListLen = ref(JSON.parse(localStorage.getItem('cartList') ?? '[]').length || 0)

onMounted(() => {
  window.addEventListener('setItemEvent', function(e) {
    if (e.key && e.key === 'cartList' && e.newValue) {
      cartListLen.value = JSON.parse(e.newValue).length
    }
  })
});
</script>

<template>
  <header class="bg-gray-800 text-white text-right">
    <div class="p-5">
      <nav>
        <RouterLink to="/" class="p-5 hover:text-blue-500">販售列表</RouterLink>
        <RouterLink to="/cart" class="hover:text-blue-500">購物車({{ cartListLen }})</RouterLink>
      </nav>
    </div>
  </header>

  <main class="md:w-10/12 w-full m-auto">
    <RouterView />
  </main>
</template>

<style scoped>
.router-link-active {
  @apply text-blue-500 cursor-default;
}
</style>
