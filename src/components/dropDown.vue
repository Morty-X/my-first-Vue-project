<template>
  <div class="inline-block relative">
    <!-- 透明遮罩层 全局显示 -->
    <div
      v-show="visible"
      class="fixed left-0 right-0 top-0 bottom-0 z-40 overflow-hidden bg-transparent"
    ></div>

    <!-- 内置组件slot它的作用是对你传递的子标签的引用指定渲染位置 -->
    <div ref="main" @click.stop="visible = true" class="inline-block">
      <slot></slot>
    </div>

    <div
      ref="dropdownContains"
      v-show="visible"
      class="absolute left-0 top-[100%] z-50 text-[#fff] w-[150px] py-[6px] flex flex-col gap-[2px] px-[4px] bg-[#252526] border border-[#454545] rounded-[10px]"
    >
      <!-- 注意 类名合并采用数组的形式 -->
      <div
        v-for="item in attrs.data"
        @click="triggerEvent(item)"
        v-bind:key="item"
        :class="[
          'w-full pl-[6px] leading-[28px] rounded-[6px] h-[28px]',
          {
            ' text-[#686868] cursor-not-allowed': !item.disable,
            'hover:bg-[#0078d4] cursor-pointer': item.disable,
          },
        ]"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
// script setup属性 的作用：可以直接使用组合式API

import { defineEmits, ref, useAttrs } from 'vue';
import { useClickOutside } from '@/hooks';
  
const visible = ref(false);
const drowdownList = ['Open Edits', 'Folders', 'Outline', 'Timeline'];
// useAttrs 使用这个组件上的属性
const attrs = useAttrs();
console.log('🚀 -----------------------------------🚀');
console.log('🚀 ~ dropDown.vue:26 ~ attrs:', attrs);
console.log('🚀 -----------------------------------🚀');

const main = ref(null);

useClickOutside(main, () => {
  visible.value = false;
});

// 给组件添加自定义事件 isChecked 
const emit = defineEmits(['isChecked']);

function triggerEvent(item) {
  // 触发事件 并且给事件的回调函数传入参数 item
  emit('isChecked', item);
  if (!item.disable) {
    visible.value = false;
  }
}
</script>
