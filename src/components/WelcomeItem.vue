<template>
  <div class="flex justify-between w-full md:p-6 py-6 -m-px border-b last:border-b-0">
    <slot name="select"></slot>
    <div class="flex-auto w-60 flex flex-row">
      <slot name="image"></slot>
      <div class="mx-3">
        <p class="md:ml-2 md:font-medium text-base">
          <slot name="title"></slot>
        </p>
        <p class=" text-sm text-gray-400 md:ml-2 md:my-2 my-[5px]">
          <slot name="status"></slot>
        </p>
        <p class="text-lg text-red-600 md:ml-2">
          <slot name="price"></slot>
        </p>
      </div>
    </div>
    <div class="flex items-center">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
