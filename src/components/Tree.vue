<template>
  <!-- 递归渲染 -->
  <!-- 第一次渲染 所给数据中最外层的三层结构 -->
  <!-- 在渲染子结构时判断需要展开的id值(expandKeys)中是否包含当前结构的 id 属性值 -->
  <!-- 如果包含，那么自此 id 值后的下一级结构就会渲染，否则不渲染 -->

  <div class="pl-[12px]" v-for="item in props.data" :key="item.id">
    <!-- 当用户点击某个节点时，会触发上一级的 node-click 事件，并
     附带被点击节点的 ID，从而允许父组件处理这个点击事件。 -->
    <div
      @click="emit('node-click', item.id)"
      class="box-border hover:bg-[#2a2d2e] text-[14px] text-[#ccc] cursor-pointer"
      :style="{
        paddingLeft: `${props.padding ?? 0}px`,
      }"
    >
      {{ item.label }}
    </div>
    <!-- 再给子树状结构 添加expandKeys属性 保证每个树状节点都具有 expandKeys属性-->
    <!-- emit('node-click', id) 用于触发一个名为 node-click 的事件，并将当前节点的 id 作为参数传递出去。 -->
    <Tree
      v-if="
        item.children &&
        item.children.length > 0 &&
        props.expandKeys.includes(item.id)
      "
      :data="item.children"
      :padding="props.padding + 10"
      :expandKeys="props.expandKeys"
      @node-click="(id) => emit('node-click', id)"
    ></Tree>
  </div>
</template>

<script setup>
// 如何获取组件通过属性传递过来的数据(useAttrs)
import { useAttrs, defineOptions, defineProps, defineEmits } from 'vue';

// 获取自定义属性上的值 (使用了)
// const attrs = useAttrs();

//  通过defineOptions 规定该组件名称
defineOptions({ name: 'Tree' });

// 获取组件通过属性传递过来的数据并给它设置一些限制

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
  expandKeys: {
    type: Array,
    default: [],
  },
  // baz: {
  //   required: true,
  //   validator(value) {
  //     console.log('🚀 ~ tree.vue:56 ~ validator ~ value:', value);
  //     return ['a', 'b', 'c'].includes('abc');
  //   },
  // },
});

// 在组件中自定义事件

const emit = defineEmits(['node-click']);

// ==================================================
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
</script>
