<template>
  <div class="w-screen h-screen flex flex-col">
    <!-- top -->
    <div class="w-full h-[35px] bg-[#3c3c3c] flex">
      <div class="flex-1 h-[35px] text-right">
        <Icon
          class="inline-block cursor-pointer"
          icon="solar:arrow-left-outline"
          width="20"
          height="20"
          style="color: #fff"
        />
        <Icon
          class="inline-block ml-[10px] cursor-pointer"
          icon="solar:arrow-right-linear"
          width="20"
          height="20"
          style="color: #fff"
        />
      </div>
      <div class="w-[700px] h-[35px] flex justify-center items-center">
        <div
          class="cursor-pointer w-[500px] h-[26px] flex justify-center items-center border border-[#737373] rounded-[8px] hover:bg-[#4b4b4b] bg-[#3c3c3d]"
        >
          <Icon
            class="mr-[6px]"
            icon="quill:search"
            width="18"
            height="18"
            style="color: #aeaeae"
          />
          <span
            v-text="str"
            class="text-[14px] hover:text-[#929292] text-[#cccccc]"
          ></span>
        </div>
      </div>
      <div
        class="cursor-default flex-1 h-[35px] items-center flex justify-end gap-[16px] pr-[20px]"
      >
        <Icon
          class="cursor-pointer"
          icon="uis:window-grid"
          width="18"
          height="18"
          style="color: #cccccc"
        />
        <Icon
          class="cursor-pointer"
          icon="icon-park-outline:freeze-column"
          width="18"
          height="18"
          style="color: #aeaeae"
        />
        <!-- <Icon
          icon="si:columns-duotone"
          width="18"
          height="18"
          style="color: #aeaeae"
        /> -->
        <!-- <Icon
          icon="fluent:layout-column-two-focus-left-32-filled"
          width="18"
          height="18"
          style="color: #aeaeae"
        /> -->
        <Icon
          class="cursor-pointer"
          icon="fluent:layout-row-two-split-top-focus-bottom-20-filled"
          width="20"
          height="20"
          style="color: #aeaeae"
        />
        <Icon
          class="cursor-pointer"
          icon="fluent:layout-column-one-third-right-24-regular"
          width="20"
          height="20"
          style="color: #aeaeae"
        />
      </div>
    </div>

    <!-- middle -->
    <div class="flex-1 flex">
      <!-- left -->
      <!-- 左侧 选项部分 -->
      <div
        class="w-[48px] bg-[#333] flex-col flex py-[10px] justify-between cursor-pointer"
      >
        <div class="w-full h-[300px] flex flex-col justify-between items-center">
          <Icon
            icon="codicon:github"
            width="28"
            height="28"
            class="text-[#fff] hover:text-[#c2c2c2]"
          />
          <Icon
            icon="fa-solid:copy"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
          <Icon
            icon="quill:search"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
          <Icon
            icon="tdesign:git-branch"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
          <Icon
            icon="qlementine-icons:run-debug-16"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
          <Icon
            icon="codicon:extensions"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
          <Icon
            icon="mage:robot"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
        </div>
        <div class="w-full flex-1 items-center flex flex-col justify-end gap-[18px]">
          <Icon
            icon="qlementine-icons:user-16"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
          <Icon
            icon="material-symbols:settings-outline"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
        </div>
      </div>

      <!-- middle -->
      <!-- 文件目录列表 -->
      <div class="w-[307px] bg-[#252526]">
        <!-- 下拉菜单功能 -->
        <div
          class="flex items-center h-[30px] text-[14px] text-[#eee] justify-between px-[12px]"
        >
          <span>EXPLORER</span>

          <div
            v-on:click.stop="opendrowdown"
            class="cursor-pointer relative w-[24px] h-[24px] rounded-[6px] hover:bg-[#363737]"
          >
            <span class="inline-block w-[24px] h-[24px] text-center leading-[24px]"
              >···</span
            >
            <!-- 点击 ... 后右边出现的选项卡 -->
            <div
              ref="dropdownContains"
              v-show="drowdownVisible"
              class="w-[150px] py-[6px] flex flex-col gap-[2px] px-[4px] bg-[#252526] border border-[#454545] rounded-[10px]"
            >
              <!-- <div class="w-full rounded-[6px] h-[28px] bg-[#0078d4]"></div> -->
              <div
                class="w-full pl-[6px] leading-[28px] rounded-[6px] h-[28px] hover:bg-[#0078d4]"
                v-for="item in drowdownList"
                v-bind:key="item"
                v-text="item"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="w-full bg-[#1e1e1e] flex justify-center items-center">
        <div class="w-[400px] h-[500px]">
          <div class="w-full h-[280px]">
            <Icon
              icon="garden:terminal-window-stroke-12"
              width="400"
              height="280"
              style="color: #151515"
            />
          </div>

          <div class="w-full h-[220px] flex flex-col items-center gap-[6px]">
            <!-- Show All Commands -->
            <div
              v-for="item in objDataArr"
              v-bind:key="item.name"
              class="inline-flex items-center mt-[10px]"
            >
              <span
                v-text="item.name"
                class="mr-[8px] cursor-default w-[160px] text-right text-[#717171] text-[14px]"
              ></span>
              <!--  Ctrl -->
              <div class="inline-flex text-[14px] w-[200px] items-center">
                <template v-for="key in item.keyWords">
                  <div
                    v-if="key !== '+'"
                    v-text="key"
                    class="px-[6px] cursor-pointer rounded-[6px] py-[3px] text-[12px] text-[#a4a4a4] bg-[#2c2c2c]"
                  ></div>
                  <span
                    v-if="key === '+'"
                    v-text="key"
                    class="cursor-pointer mx-[2px] text-[#a4a4a4]"
                  ></span>
                </template>
              </div>
            </div>

            <!-- <div class="inline-flex items-center my-[10px]">
              <span class="mr-[8px] text-[#717171] text-[16px]"
                >Show All Commands</span
              >
              <div class="inline-flex text-[14px] items-center">
                <div
                  class="px-[6px] rounded-[6px] py-[3px] text-[#a4a4a4] bg-[#2c2c2c]"
                >
                  Ctrl
                </div>
                <span class="mx-[2px]"> +</span>
                <div
                  class="px-[6px] rounded-[6px] py-[3px] text-[#a4a4a4] bg-[#2c2c2c]"
                >
                  Ctrl
                </div>
                <span class="mx-[2px]"> +</span>
                <div
                  class="px-[6px] rounded-[6px] py-[3px] text-[#a4a4a4] bg-[#2c2c2c]"
                >
                  Ctrl
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <div
      class="w-full flex justify-around text-[#fff] text-[12px] h-[22px] bg-[#007acc]"
    >
      <div class="flex-1 h-full inline-flex">
        <!-- Vue名 -->
        <div
          class="w-[100px] h-full hover:bg-[#329071] bg-[#16825d] flex justify-center items-center cursor-pointer"
        >
          <Icon
            icon="icon-park-outline:code-one"
            width="16"
            height="16"
            style="color: #fff"
          />

          vuejs/vue
        </div>
        <!-- main 分支 -->
        <div
          class="w-[70px] h-full hover:bg-[#1f8ad2] flex justify-center items-center cursor-pointer"
        >
          <Icon
            class="mr-[4px]"
            icon="oui:branch"
            width="14"
            height="14"
            style="color: #fff"
          />
          main
        </div>

        <!-- 重载 -->
        <div
          class="w-[22px] h-[22px] flex cursor-pointer justify-center items-center hover:bg-[#1f8ad2]"
        >
          <Icon icon="ion:reload" width="16" height="16" style="color: #fff" />
        </div>
        <!-- 错误和警告 -->
        <div
          class="w-[70px] cursor-pointer align-bottom text-center h-full hover:bg-[#1f8ad2]"
        >
          <Icon
            class="inline-block mx-[3px] translate-y-[2px]"
            icon="codicon:error"
            width="16"
            height="16"
            style="color: #fff"
          />
          <span class="inline-block translate-y-[3px]">0</span>
          <Icon
            class="inline-block mx-[3px] translate-y-[2px]"
            icon="typcn:warning-outline"
            width="16"
            height="16"
            style="color: #fff"
          />
          <span class="inline-block translate-y-[3px]">0</span>
        </div>
        <div class="w-[200px] h-full flex">
          <div class="w-[100px] h-full flex justify-center items-center">
            <Icon icon="line-md:heart" width="18" height="18" style="color: #fff" />
            <span class="text-[14px] ml-[4px] cursor-default"> Sponsors:</span>
          </div>
          <div
            class="text-[14px] h-full px-[8px] hover:bg-[#1f8ad2] cursor-pointer text-center"
          >
            morty
          </div>
        </div>
      </div>
      <div class="w-[130px] h-full flex items-center">
        <div
          class="cursor-pointer w-[100px] hover:bg-[#1f8ad2] text-center h-full leading-[22px]"
        >
          Layout: US
        </div>
        <div
          class="w-[22px] h-full flex justify-center items-center hover:bg-[#1f8ad2] cursor-pointer"
        >
          <Icon icon="mdi:bell-outline" width="14" height="14" style="color: #fff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 取消dom操作 转而用指令替代
// 在 Vue.js中 指令是操作dom的唯一方法
// 指令是以 v- 开头的一种特殊标签自定义属性，具备操作 Dom 的能力

// Vue 中数据变化(响应数据) 导致 视图更新
// 响应式API的作用：将js数据转换为响应式数据

// v-text   给元素绑定内容文本
// v-on     给元素绑定事件
// v-show
// v-for 循环渲染 注意点：v-for 指令 一定要搭配 v-bind:key="" 指令使用 当前列表中唯一不变
// 的值，一般是 id

// v-bind 是给所有标签属性（官方、自定义）绑定值的

import { ref, onMounted } from 'vue'
// 导入组件
import baz from '@/components/baz.vue'
import { Icon } from '@iconify/vue'
import { clickOutside } from '@/hooks/index.js'

// 接受一个内部值，返回一个响应式的、可更改的 ref 对象
var str = ref('world!')


const drowdownList = ['Open Edits', 'Folders', 'Outline', 'Timeline']

const objDataArr = [
  {
    name: 'ShowAll Commands',
    keyWords: ['Ctrl', '+', 'Shift', '+', 'Alt'],
  },
  {
    name: 'Go to File',
    keyWords: ['Ctrl', '+', 'P'],
  },
  {
    name: 'Open Settings',
    keyWords: ['Ctrl', '+', ','],
  },
  {
    name: 'Find in Files',
    keyWords: ['Ctrl', '+', 'Shift', '+', 'F'],
  },
]


// 头部右侧图标 点击切换图标 并且更改页面布局 




// 渲染的机制是异步的  ele是在页面渲染完成后获得的对象
// 因ele是引用数据类型 value属性值是 null ,异步获取节点然后赋值给 value
// const ele = ref(null)

// 然而 ele.value 的打印过程 是同步的，页面加载时 js主线程上的程序
// 会首先执行，但由于页面渲染还没有完成，所以此时ele并没有获取到,
// ele.value=null
// ======================
// console.log('ele.value', ele.value)

// 注册一个回调函数，在组件挂载完成后执行。

// 将点击某 dom 元素外的区域，该DOM元素隐藏的逻辑封装成一个 函数

// 将点击 ... 下拉选择框出现，点击菜单外围，菜单隐藏的功能 组合起来
function actionDropDown() {
  // 菜单是否显示
  let visible = ref(false)

  // 菜单 dom 元素
  const domRef = ref(null)
  /**
   * 打开对话框或界面的函数
   * 将 visible.value 设置为 true，以控制界面的显示状态
   */
  const open = () => (visible.value = true)
  // 使用 clickOutside 指令监听点击事件，当点击不在 domRef 元素内部时
  // 将 visible 的值设置为 false
  clickOutside(domRef, () => {
    visible.value = false
  })

  return { visible, domRef, open }
}
// 解构赋值从actionDropDown函数返回的对象中的属性，以便在当前作用域内直接使用
// visible属性重命名为drowdownVisible，用于控制下拉菜单的显示与隐藏
// domRef属性重命名为dropdownContains，引用下拉菜单的DOM元素
// open属性重命名为opendrowdown，用于执行打开下拉菜单的操作
const {
  visible: drowdownVisible,
  domRef: dropdownContains,
  open: opendrowdown,
} = actionDropDown()
















</script>
