<script setup>
import { ref, onMounted } from 'vue';
import WelcomeItem from './WelcomeItem.vue'

const data = ref([]);
const error = ref('');
const cartList = ref(JSON.parse(localStorage.getItem('cartList') ?? '[]'));

// 取得課程列表
const getLesson = () => {
  fetch('https://run.mocky.io/v3/d7a29aba-9aac-4a97-b1b7-7b3d87ae8b7e')
    .then((res) => res.json())
    .then((d) => (data.value = d))
    .catch((err) => error.value = err)
};

// 加入購物車
const handleAddCart = (item) => {
  cartList.value.push({ ...item, disabled: true });

  localStorage.setItem('cartList', JSON.stringify(cartList.value))
};

// 是否已存在購物車中
const isAddCart = (id) => {
  let disabled = false;

  cartList.value.forEach((c) => {
    if (c.id === id) {
      disabled = c.disabled
    }
  });

  return disabled;
};

onMounted(() => {
  getLesson();
});
</script>

<template>
  <div class="flex flex-wrap md:p-8 p-3 border border-gray-300/100">
    <WelcomeItem v-for="item in data" :key="item.id">
      <template #image>
        <div class="image" :style='{ backgroundImage: `url(${item.picture})` }'></div>
      </template>
      <template #title>{{ item.title }}</template>
      <template #status>{{ item.status }}</template>
      <template #price>${{ item.price }}</template>

      <button
        v-if="data.length"
        class="red-button content-center"
        :disabled="isAddCart(item.id) || item.status === '尚未開始'"
        @click="handleAddCart(item)"
      >
        加入購物車
      </button>
    </WelcomeItem>
  </div>
</template>
