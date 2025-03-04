<template>
  <div>我是树状结构组件</div>

  <!--在VUE主页面中插入 Tree组件并给它 绑定 data 属性 -->
  <Tree :data="data" :expandKeys="expandIds" @node-click="fn"></Tree>

  
</template>

<script setup>
// 导入自定义树状组件
import { ref } from 'vue';
import Tree from '@/components/Tree.vue';
// 对数据修改 给每一级目录 添加 id  属性用以判断该目录的子目录展开/显示
// 展开的目录id

const expandIds = ref([]);

//  要实现点击展开目录功能 需要给每一个树状结构添加点击事件

const data = [
  {
    label: '一级 1',
    id: 1,
    children: [
      {
        label: '二级 1-1',
        id: 2,
        children: [
          {
            label: '三级 1-1-1',
            id: 3,
          },
        ],
      },
    ],
  },

  {
    label: '一级 2',
    id: 4,
    children: [
      {
        label: '二级 2-1',
        id: 5,
        children: [
          {
            label: '三级 2-1-1',
          },
        ],
      },
      {
        label: '二级 2-2',
        id: 6,
        children: [
          {
            label: '三级 2-2-1',
            id: 7,
          },
        ],
      },
    ],
  },

  {
    label: '一级 3',
    id: 8,
    children: [
      {
        label: '二级 3-1',
        id: 9,
        children: [
          {
            label: '三级 3-1-1',
            id: 10,
          },
        ],
      },
      {
        label: '二级 3-2',
        id: 11,
        children: [
          {
            label: '三级 3-2-1',
            id: 12,
          },
        ],
      },
    ],
  },
];

function fn(id) {
  console.log('🚀 ~ App.vue:92 ~ fn ~ id:', id);
  const index = expandIds.value.indexOf(id);
  if (index > -1) {
    expandIds.value.splice(index, 1);
  } else {
    expandIds.value.push(id);
  }
}
</script>
