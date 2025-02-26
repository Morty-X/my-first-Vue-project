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
          class="cursor-pointer w-[500px] h-[26px] flex justify-center items-center border border-[#737373] rounded-[8px] bg-[#4b4b4b]"
        >
          <Icon
            class="mr-[6px]"
            icon="quill:search"
            width="18"
            height="18"
            style="color: #aeaeae"
          />
          <span v-text="str" class="text-[14px] text-[#cccccc]"></span>
        </div>
      </div>
      <div
        class="cursor-pointer flex-1 h-[35px] items-center flex justify-end gap-[16px] pr-[20px]"
      >
        <Icon icon="uis:window-grid" width="18" height="18" style="color: #cccccc" />
        <Icon
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
          icon="fluent:layout-row-two-split-top-focus-bottom-20-filled"
          width="20"
          height="20"
          style="color: #aeaeae"
        />
        <Icon
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
            v-on:click="opendrowdown"
            class="cursor-pointer relative w-[24px] h-[24px] rounded-[6px] hover:bg-[#363737]"
          >
            <span class="inline-block w-[24px] h-[24px] text-center leading-[24px]"
              >···</span
            >
            <!-- 点击 ... 后右边出现的选项卡 -->
            <div
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

          <!-- <div
            v-on:click="openDropDown"
            v-on:mouseenter="showtip"
            v-on:mouseleave="hidetip"
            class="cursor-pointer relative w-[20px] h-[20px] rounded-[2px] leading-[20px] hover:bg-red-300"
          > -->
          <!-- <span>...</span> -->

          <!-- <div
              v-show="tootipisShow"
              class="absolute z-10 w-[80px] h-[20px] border-2 border-sky-500"
            >
              提示框
            </div> -->

          <!-- <div
              v-show="drowdownVisible"
              class="absolute w-[160px] z-30 rounded-[10px] h-[112px] border-[#454545] border"
            > -->
          <!-- <div
                v-for="item in drowdownList"
                v-bind:key="item"
                v-text="item"
              ></div> -->
          <!-- </div> -->
          <!-- </div> -->
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

import { ref } from 'vue'
// 导入组件
import baz from '@/components/baz.vue'
import { Icon } from '@iconify/vue'

var str = ref('world!')

let drowdownVisible = ref(false)

let tootipisShow = ref(false)

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

function opendrowdown() {
  console.log('绑定点击事件')
  drowdownVisible.value = !drowdownVisible.value
}

function showtip() {
  if (!drowdownVisible.value) {
    tootipisShow.value = true
  }
}

function hidetip() {
  if (drowdownVisible.value) {
    tootipisShow.value = false
  }
}
</script>
