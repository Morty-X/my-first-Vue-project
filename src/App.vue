<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col">
    <!-- top -->
    <div class="w-full flex justify-between h-[35px] bg-[#3c3c3c]">
      <div class="w-[20vw] h-[35px] text-right"></div>

      <div class="w-[60vw] h-[35px] flex justify-center items-center">
        <div class="w-[15vw] justify-between items-center mr-[18px] h-full">
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

        <div
          class="cursor-pointer w-[40vw] mr-[8vw] h-[26px] flex justify-center items-center border border-[#737373] rounded-[8px] hover:bg-[#4b4b4b] bg-[#3c3c3d]"
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

      <!-- 右侧图标部分 -->

      <div class="h-full w-[20vw] justify-end pr-[10px] flex items-center">
        <div class="flex ml-[6px] cursor-pointer">
          <Icon
            class="cursor-pointer"
            icon="codicon:layout"
            width="24"
            height="24"
            style="color: #cccccc"
          />
        </div>
        <!-- 使用Vue条件渲染图标 -->
        <div
          @click.stop="leftBarVisible = !leftBarVisible"
          class="flex ml-[6px] cursor-pointer"
        >
          <Icon
            v-if="leftBarVisible"
            icon="meteor-icons:sidebar"
            width="22"
            height="22"
            style="color: #cccccc"
          />
          <Icon
            v-else
            icon="tabler:layout-sidebar-filled"
            width="24"
            height="24"
            style="color: #cccccc"
          />
        </div>

        <div
          @click.stop="bottomBarVisible = !bottomBarVisible"
          class="flex ml-[6px] cursor-pointer"
        >
          <Icon
            v-if="bottomBarVisible"
            icon="tabler:layout-bottombar-filled"
            width="24"
            height="24"
            style="color: #cccccc"
          />
          <Icon
            v-else
            icon="ci:bar-bottom"
            width="24"
            height="24"
            style="color: #cccccc"
          />
        </div>

        <div
          @click.stop="rightBarVisible = !rightBarVisible"
          class="flex ml-[6px] cursor-pointer"
        >
          <Icon
            v-if="rightBarVisible"
            icon="tabler:layout-sidebar-right-filled"
            width="24"
            height="24"
            style="color: #cccccc"
          />
          <Icon
            v-else
            icon="tabler:layout-sidebar-right"
            width="24"
            height="24"
            style="color: #cccccc"
          />
        </div>
      </div>
    </div>

    <!-- middle -->
    <div class="flex-1 flex">
      <!-- left -->
      <!-- 左侧 选项 图标 部分 -->
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
          <!-- =========下列可循环渲染=========== -->
          <!-- ["fa-solid:copy","quill:search",'tdesign:git-branch','qlementine-icons:run-debug-16'
            ,'codicon:extensions','mage:robot'] -->
          <Icon
            v-for="(item, index) in customerIconName"
            v-bind:key="item"
            v-bind:icon="item"
            @click="customerMenuItemIndex = index"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
            :class="{ 'text-[#fff]': customerMenuItemIndex === index }"
          />
        </div>
        <div class="w-full flex-1 items-center flex flex-col justify-end gap-[18px]">
          <!-- ['qlementine-icons:user-16','material-symbols:settings-outline'] -->
          <Icon
            v-for="(item, index) in systemIconName"
            v-bind:key="item"
            :icon="item"
            width="28"
            height="28"
            class="hover:text-[#fff] text-[#858585]"
          />
        </div>
      </div>
      <!-- middle -->
      <!-- 文件目录列表 -->
      <div v-show="leftBarVisible" class="w-[307px] bg-[#252526]">
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
        <ul class="text-[#fff] bg-red-400 px-[1vw] text-[1.2vw]">
          <li
            class="cursor-pointer"
            v-for="file in responseData"
            :key="file.name"
            v-text="file.name"
          ></li>
        </ul>
      </div>

      <!-- 中间文件预览区 -->
      <div class="w-full bg-[#1e1e1e] flex flex-col">
        <div class="bg-[#1e1e1e] w-full flex-1"></div>
        <div
          v-show="bottomBarVisible"
          class="w-full border-[#363636] border-t h-[10vw] bg-[#1e1e1e]"
        ></div>
      </div>

      
      <div
        v-show="rightBarVisible"
        class="w-[300px] px-[12px] py-[8px] h-full bg-[#252526]"
      >
        <div class="w-full flex h-[20px]  ">
          <div class="w-1/2 flex text-left justify-start items-center">
            <div
              class="mr-[1vw] w-[20px] h-[24px] flex justify-center items-center border-b border-[#e1e1e1]"
            >
              <Icon
                icon="ion:chatbox-ellipses-outline"
                width="16"
                height="16"
                class="hover:text-[#b2b2b2] text-[#e1e1e1]"
              />
            </div>
            <div class="mr-[1vw] w-[20px] h-[24px] flex justify-center items-center">
              <Icon
                icon="fluent:clipboard-text-edit-24-regular"
                width="16"
                height="16"
                class="hover:text-[#e1e1e1] text-[#b2b2b2]"
              />
            </div>
          </div>
          <div class="w-1/2 h-full justify-end flex items-center">
            <div class="flex">
              <Icon
                icon="si:add-duotone"
                width="24"
                height="24"
                style="color: #787878"
              />
            </div>

            <div class="flex">
              <Icon
                icon="radix-icons:countdown-timer"
                width="18"
                height="18"
                style="color: #787878"
              />
            </div>

            <div
              class="flex w-[20px] h-[20px] justify-center items-center ml-[3px] cursor-pointer hover:bg-[#363737] rounded-[0.4vw]"
            >
              <Icon
                icon="ri:more-line"
                width="18"
                height="18"
                style="color: #c5c5c5"
              />
            </div>
            <div
              @click="rightBarVisible = !rightBarVisible"
              v-show="rightBarVisible"
              class="flex w-[20px] h-[20px] justify-center items-center  ml-[3px] cursor-pointer hover:bg-[#363737] rounded-[0.4vw]"
            >
              <Icon
                icon="ion:close-outline"
                width="18"
                height="18"
                style="color: #c5c5c5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end 底部内容 -->
    <div
      class="w-full flex justify-between text-[#fff] text-[12px] h-[22px] bg-[#007acc]"
    >
      <div class="h-[22px] flex-1 inline-flex">
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

        <div
          class="w-[22px] h-[22px] flex cursor-pointer justify-center items-center hover:bg-[#1f8ad2]"
        >
          <Icon icon="ion:reload" width="16" height="16" style="color: #fff" />
        </div>

        <div
          @click="bottomBarVisible = !bottomBarVisible"
          class="w-[70px] select-none cursor-pointer align-bottom text-center h-full hover:bg-[#1f8ad2]"
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
      <div class="h-[22px] w-[130px] flex items-center">
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

import { ref, onMounted, watchEffect } from 'vue';
// 导入组件
import baz from '@/components/baz.vue';
import { Icon } from '@iconify/vue';
import { clickOutside } from '@/hooks';
import axios from 'axios';
import { data } from 'autoprefixer';

// 接受一个内部值，返回一个响应式的、可更改的 ref 对象
var str = ref('world!');

const drowdownList = ['Open Edits', 'Folders', 'Outline', 'Timeline'];

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
];

// 头部右侧图标 点击切换图标 并且更改页面布局

const leftBarVisible = ref(false);
const rightBarVisible = ref(false);
const bottomBarVisible = ref(false);

// 接着 让页面的布局 跟随我响应式数据的变化而更改

// watchEffect(() => {

// })

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
  let visible = ref(false);

  // 菜单 dom 元素
  const domRef = ref(null);
  /**
   * 打开对话框或界面的函数
   * 将 visible.value 设置为 true，以控制界面的显示状态
   */
  const open = () => (visible.value = true);
  // 使用 clickOutside 指令监听点击事件，当点击不在 domRef 元素内部时
  // 将 visible 的值设置为 false
  clickOutside(domRef, () => {
    visible.value = false;
  });

  return { visible, domRef, open };
}

// 解构赋值从actionDropDown函数返回的对象中的属性，以便在当前作用域内直接使用
// visible属性重命名为drowdownVisible，用于控制下拉菜单的显示与隐藏
// domRef属性重命名为dropdownContains，引用下拉菜单的DOM元素
// open属性重命名为opendrowdown，用于执行打开下拉菜单的操作
const {
  visible: drowdownVisible,
  domRef: dropdownContains,
  open: opendrowdown,
} = actionDropDown();

// =============================================================
// 左侧图标选项卡鼠标点击 当前图标高亮 其它图标不高亮

// customerIconName
// systemIconName

const customerIconName = [
  'fa-solid:copy',
  'quill:search',
  'tdesign:git-branch',
  'qlementine-icons:run-debug-16',
  'codicon:extensions',
  'mage:robot',
];
const systemIconName = [
  'qlementine-icons:user-16',
  'material-symbols:settings-outline',
];

const customerMenuItemIndex = ref(0);
watchEffect(() => {
  console.log('customerMenuItemIndex.value', customerMenuItemIndex.value);
});

// ==============================================
// 发送 axios 请求 渲染文件夹列表
// 由于 向后端发送 axios 请求 十分常用 可写成一个函数方便复用

function sendApiRequest(
  apiFun,
  options = {
    defaultData,
  }
) {
  // ref()接收一个内部值(ref小括号内的值)返回一个响应式的、可更改的 ref 对象
  const data = ref(options.defaultData ?? null);
  const error = ref(undefined);
  // 是否请求完成
  const loading = ref(false);
  apiFun()
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      console.log('请求已发送！');
      loading.value = true;
    });
  return {
    data,
    error,
    loading,
  };
}

const {
  data: responseData,
  error,
  loading,
} = sendApiRequest(() => axios.get('/veet/api'), {
  defaultData: [],
});

// 它会以默认值输出 如何解决？
watchEffect(() => {
  // 监听响应式数据的变化，并在变化时打印 data, error 和 loading 的值
  // 第一次会打印数据的默认值，此后只要数据发生改变，就会打印相关值
  // console.log(data.value, error.value, loading.value);
  // 我需要让 data没有数据的情况下 默认返回一个空数组，这样在根据数据进行渲染
  // 页面时不会报 语法错误(找不到数据)
  console.log(responseData.value);
});

// axios
//   .get('/veet/api')
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log('请求已发送！');
//   });
</script>
