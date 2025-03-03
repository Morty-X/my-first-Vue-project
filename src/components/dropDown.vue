<template>
    <!-- 透明遮罩层 全局显示 -->
    <div class=" fixed left-0 right-0 top-0 bottom-0 overflow-hidden bg-transparent"></div>

    <!-- 内置组件slot它的作用是对你传递的子标签的引用指定渲染位置 -->

    <!-- 点击 ... 后右边出现的选项卡 -->
    <div ref="dropdownContains" v-show="drowdownVisible"
        class="w-[150px] py-[6px] flex flex-col gap-[2px] px-[4px] bg-[#252526] border border-[#454545] rounded-[10px]">
        <div class="w-full pl-[6px] leading-[28px] rounded-[6px] h-[28px] hover:bg-[#0078d4]"
            v-for="item in drowdownList" v-bind:key="item" v-text="item"></div>
    </div>

</template>

<script setup>
import { defineEmits } from 'vue'
// script setup属性 的作用：可以直接使用组合式API
const fn = (item) => {


}
const emit = defineEmits(['change', 'delete'])


</script>