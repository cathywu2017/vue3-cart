<script setup>
import { ref, onMounted } from 'vue';
import WelcomeItem from './WelcomeItem.vue'

const data = ref([]);
const error = ref('');
const cartList = ref(JSON.parse(localStorage.getItem('cartList') ?? '[]'));

// 取得課程列表
const getLesson = () => {
  fetch('https://vue-course-api.hexschool.io/api/cathyvueproject/products')
    .then((res) => res.json())
    .then((d) => {
      const newProducts = d.products.map((i, index) => {
        let item = { ...i, status: '庫存正常' };

        if ([2, 6].includes(index)) {
          item.status = '預購中';
        }

        if ([3, 5, 8, 9].includes(index)) {
          item.status = '尚未販售';
        }

        return item;
      })
      console.log(newProducts);
      return data.value = newProducts;
    })
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
        <div class="image" :style='{ backgroundImage: `url(${item.imageUrl})` }'></div>
      </template>
      <template #title>{{ item.title }}</template>
      <template #status>{{ item.status }}</template>
      <template #price>${{ item.price }}</template>

      <button
        v-if="data.length"
        class="red-button content-center"
        :disabled="isAddCart(item.id) || item.status === '尚未販售'"
        @click="handleAddCart(item)"
      >
        加入購物車
      </button>
    </WelcomeItem>
  </div>
</template>
