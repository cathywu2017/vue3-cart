<script setup>
import { ref, computed } from 'vue';
import WelcomeItem from './WelcomeItem.vue'

const data = ref(JSON.parse(localStorage.getItem('cartList') ?? '[]'));
const selectOpt = ref([]);

// 是否全選
const selectAll = computed(() => (
  selectOpt.value.length === data.value.length
  && selectOpt.value.length !== 0
));

// 總計
const total = computed(() => {
  let price = 0;

  data.value.forEach((d) => {
    price += Number(d.price);
  });

  return price;
});

// 刪除
const handleDelete = (id) => {
  if (id) {
    data.value = data.value.filter((d) => (d.id !== id));
  }

  if (!id) {
    data.value = data.value.filter((d) => selectOpt.value.every((s) => d.id !== s));
  }

  localStorage.setItem('cartList', JSON.stringify(data.value));

  selectOpt.value = [];
  selectAll.value = false;
};

// 選擇全部
const handleSelectedAll = () => {
  const dataLen = data.value.length;
  const selectOptLen = selectOpt.value.length;

  if (selectOptLen === dataLen) {
    selectAll.value = false;
    selectOpt.value = [];
  }

  if (selectOptLen !== dataLen) {
    selectAll.value = true;
    selectOpt.value = data.value.map((d) => d.id);
  }
};
</script>

<template>
  <div class="">
    <div class="md:p-6 p-4">
      <input
        class="mr-5"
        type="checkbox"
        :checked="selectAll"
        :disabled="data.length === 0"
        @click="handleSelectedAll"
      >

      <button
        class="button p-2 bg-gray-800  hover:bg-gray-900"
        :disabled="selectOpt.length === 0"
        @click="handleDelete()"
      >
        刪除所選商品
      </button>
    </div>
    <div class="mb-6 border border-gray-300/100">
      <WelcomeItem v-for="d in data" :key="d.id">
        <template #select>
          <input class="md:mr-5 mx-3" type="checkbox" v-model="selectOpt" :value="d.id">
        </template>
        <template #image>
          <div class="image" :style='{ backgroundImage: `url(${d.imageUrl})` }'></div>
        </template>
        <template #title>{{ d.title }}</template>
        <template #price>${{ d.price }}</template>
        <button class="hover:text-gray-300 pr-3 md:text-base text-sm" @click="handleDelete(d.id)">刪除</button>
      </WelcomeItem>

      <div v-if="!data.length" class="p-4 text-center">目前購物車內沒有商品</div>
    </div>
    <div class="flex justify-between px-3">
      <p>
        總計
        <span class="text-lg text-red-600 ml-2">${{ total }}</span>
      </p>
      <button class="red-button">確認送出</button>
    </div>
  </div>
</template>

<style>
</style>
