<template>
  <!-- 树状结构组件 -->
  <!-- <div>我是树状结构组件</div> -->
  <!-- 如何递归渲染 -->
  <div v-for="item in props.data" :key="item.label">
    <div
    class=" box-border hover:bg-black hover:text-[#fff] cursor-pointer"
      :style="{
        paddingLeft: `${props.padding ?? 0}px`,
      }"
    >
      {{ item.label }}
    </div>

    <Tree
      :baz="b"
      v-if="item.children && item.children.length > 0"
      :data="item.children"
      :padding="props.padding + 10"
    ></Tree>
  </div>
</template>

<script setup>
// 如何获取组件通过属性传递过来的数据(useAttrs)
import { data } from 'autoprefixer';
import { useAttrs, defineOptions, defineProps } from 'vue';

// 获取自定义属性上的值 (使用了)
// const attrs = useAttrs();

//  通过defineOptions 规定组件名称
defineOptions({ name: 'Tree' });
// attribute , property 都代表属性的意义
// attribute 侧重表达HTML属性 出现在HTML标签中
// property 侧重表达DOM属性，不会出现在HTML标签中
// useAttrs没有数据检验，和默认值功能，不严谨但方便
// defineProps 不能直接使用，需要数据检验还具备默认值的功能(严谨但不方便) 强烈推荐！！！

// 先声明属性
// 只能规范数据类型 不能给默认值
// const props = defineProps({
//   data: Array,
//   padding: Number,
// });

const props = defineProps({
  data: {
    type: Array, //规定属性类型
    required: true, //表示该属性为比传参
    // default: [],  默认值 和必传参 是互斥的
  },
  padding: {
    type: Number,
    default: 0,
  },
  baz: {
    required: true,
    validator(value) {
      console.log('🚀 ~ tree.vue:56 ~ validator ~ value:', value);
      return ['a', 'b', 'c'].includes('abc');
    },
  },
});
</script>
