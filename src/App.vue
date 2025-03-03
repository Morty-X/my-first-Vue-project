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

        <!-- leftBar 控制图标 -->
        <div
          @click.stop="
            updateLayoutSetting({
              leftBar: { visible: !layoutSetting.leftBar.visible },
            })
          "
          class="flex ml-[6px] cursor-pointer"
        >
          <Icon
            v-if="layoutSetting.leftBar.visible"
            icon="tabler:layout-sidebar-filled"
            width="24"
            height="24"
            style="color: #cccccc"
          />
          <Icon
            v-else
            icon="meteor-icons:sidebar"
            width="22"
            height="22"
            style="color: #cccccc"
          />
        </div>
        <!-- bottomBar 控制图标 -->

        <div
          @click.stop="
            updateLayoutSetting({
              bottomBar: { visible: !layoutSetting.bottomBar.visible },
            })
          "
          class="flex ml-[6px] cursor-pointer"
        >
          <Icon
            v-if="layoutSetting.bottomBar.visible"
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

        <!-- rightBar 控制图标 -->
        <div
          @click.stop="
            updateLayoutSetting({
              rightBar: { visible: !layoutSetting.rightBar.visible },
            })
          "
          class="flex ml-[6px] cursor-pointer"
        >
          <Icon
            v-if="layoutSetting.rightBar.visible"
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
        <div
          class="w-full h-[300px] flex flex-col justify-between items-center"
        >
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

        <div
          class="w-full flex-1 items-center flex flex-col justify-end gap-[18px]"
        >
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

      <div
        :style="{
          width: `${layoutSetting.leftBar.width}px`,
        }"
        v-show="layoutSetting.leftBar.visible"
        class="w-[307px] relative bg-[#252526]"
      >
        <!-- 下拉菜单功能 -->
        <div
          class="flex items-center h-[30px] text-[14px] text-[#eee] justify-between px-[12px]"
        >
          <span>EXPLORER</span>

          <!-- 点击 ... 后右边出现的下拉菜单 -->
          <!-- ============= -->
          <dropdown @isChecked="checkedCallBack" :data="arrA1">
            <Icon
              icon="mdi-light:settings"
              width="28"
              height="28"
              style="color: red"
            />
          </dropdown>
          <!-- ============= -->
        </div>
        <ul class="text-[#fff] bg-red-400 px-[12px] text-[16px]">
          <li
            class="cursor-pointer"
            v-for="file in responseData"
            :key="file.name"
            v-text="file.name"
          ></li>
        </ul>
        <!-- 左右拖动的分割线 -->
        <div
          ref="leftBarRef"
          class="cursor-col-resize w-[3px] absolute top-0 right-0 h-full transition-all hover:bg-[#007acc]"
        ></div>
      </div>

      <!-- 中间文件预览区 -->

      <div class="flex-1 bg-[#1e1e1e] flex flex-col text-[#fff]">
        <div class="bg-[#1e1e1e]"></div>

        <div
          :style="{
            height: `${layoutSetting.bottomBar.height}px`,
          }"
          v-show="layoutSetting.bottomBar.visible"
          class="w-full border-[#363636] border-t h-[200px] bg-[#1e1e1e]"
        >
          <!-- 上下拖动分割线 -->
          <div
            ref="elementRef"
            class="w-full cursor-row-resize h-[3px] transition-all hover:bg-[#007acc]"
          ></div>
        </div>
      </div>

      <div
        :style="{
          width: `${layoutSetting.rightBar.width}px`,
        }"
        v-show="layoutSetting.rightBar.visible"
        class="relative w-[300px] px-[12px] py-[8px] h-full bg-[#252526]"
      >
        <!-- 右侧滑动的分割线 -->
        <div
          ref="rightBarRef"
          class="transition-all hover:bg-[#007acc] w-[3px] h-full absolute cursor-col-resize left-0 top-0"
        ></div>

        <div class="w-full flex h-[20px]">
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
            <div
              class="mr-[1vw] w-[20px] h-[24px] flex justify-center items-center"
            >
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
              @click.stop="
                updateLayoutSetting({
                  rightBar: { visible: !layoutSetting.rightBar.visible },
                })
              "
              v-show="layoutSetting.rightBar.visible"
              class="flex w-[20px] h-[20px] justify-center items-center ml-[3px] cursor-pointer hover:bg-[#363737] rounded-[0.4vw]"
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

        <!-- ========== -->
        <dropdown :data="arrA2">
          <!-- 插槽 slot  我希望点击此图标 作为下拉菜单的显示开关。注意 组件标签内包含的图标是
           属于组件本身的-->

          <Icon
            icon="mdi-light:settings"
            width="28"
            height="28"
            style="color: red"
          />
        </dropdown>

        <!-- ========== -->
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
          @click.stop="
            updateLayoutSetting({
              bottomBar: { visible: !layoutSetting.bottomBar.visible },
            })
          "
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
            <Icon
              icon="line-md:heart"
              width="18"
              height="18"
              style="color: #fff"
            />
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
          <Icon
            icon="mdi:bell-outline"
            width="14"
            height="14"
            style="color: #fff"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watchEffect,
  reactive,
  isRef,
  unref,
  toRef,
  toRefs,
  toRaw,
  toValue,
  watch,
} from 'vue';

import { Icon } from '@iconify/vue';
import { useSetting, sendApiRequest } from '@/hooks';
import axios from 'axios';
// 引入下拉菜单组件
import dropdown from '@/components/dropdown.vue';

const arrA1 = [
  { name: 'Open Edits', disable: false },
  { name: 'HIHI', disable: true },
  { name: 'Folders', disable: false },
  { name: 'Outline', disable: true },
  { name: 'Timeline', disable: false },
];
const arrA2 = [
  { name: '选项一', disable: false },
  { name: '选项二', disable: true },
  { name: '选项三', disable: false },
  { name: '选项四', disable: true },
  { name: '选项五', disable: false },
];

// 导入组件
// import { dropDown } from '@/components/dropDown.vue'

// 根据 key值('layout') 获取对应的数据，以及一个改变属性值的方法
// 这个方法便于后期制作拖拽分栏效果改变DOM的样式
// 另外，这些数据需要本地存储

const { setting: layoutSetting, updateSetting: updateLayoutSetting } =
  useSetting('layout');
console.log(toValue(layoutSetting));

// console.log(toValue(layoutSetting).leftBar.visible);

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

// 命名规范：组合式函数的名称必须以 use 开头

// 普通函数和组合式函数 有什么区别

// 1.响应式数据处理(例如 ref ,onMounted,watchEffect...)
// 2、逻辑复用 3、生命周期钩子
// 4、每个组合式函数都是独立的作用域，
// 5、组合式 API 鼓励将功能拆分为更小的组合式函数

// 组合式 函数更加方便了对状态和数据的复用

// 组合式函数如何使用

// 组合式函数只能使用在两个位置：组件的script标签的顶层 or 其它组合式函数中

// 接受一个内部值，返回一个响应式的、可更改的 ref 对象
var str = ref('world!');
// const drowdownList = ['Open Edits', 'Folders', 'Outline', 'Timeline'];

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

// 那么现在我们需要将 侧边栏的布局状态保存在 localStorage中
// 1.在 settings.json文件中编写配置项
// 2.页面第一次加载，从localstorage中读取我们设置 layout 项中的数据渲染页面

// 接着 让页面的布局 跟随我响应式数据的变化而更改

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
// function actionDropDown() {
//   // 菜单是否显示
//   let visible = ref(false);

//   // 菜单 dom 元素
//   const domRef = ref(null);
//   /**
//    * 打开对话框或界面的函数
//    * 将 visible.value 设置为 true，以控制界面的显示状态
//    */
//   const open = () => (visible.value = true);
//   // 使用 clickOutside 指令监听点击事件，当点击不在 domRef 元素内部时
//   // 将 visible 的值设置为 false
//   clickOutside(domRef, () => {
//     visible.value = false;
//   });

//   return { visible, domRef, open };
// }

// 解构赋值从actionDropDown函数返回的对象中的属性，以便在当前作用域内直接使用
// visible属性重命名为drowdownVisible，用于控制下拉菜单的显示与隐藏
// domRef属性重命名为dropdownContains，引用下拉菜单的DOM元素
// open属性重命名为opendrowdown，用于执行打开下拉菜单的操作
// const {
//   visible: drowdownVisible,
//   domRef: dropdownContains,
//   open: opendrowdown,
// } = actionDropDown();

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
  // console.log(responseData.value);
});

/**
 * 使用 Vue 的组合式 API 实现的一个移动列的功能
 * 当用户按下鼠标并移动时，计算鼠标移动的距离
 *
 * @param {Ref} domEleRef - 一个 ref 的 DOM 元素引用，用于监听鼠标事件
 * @returns {Object} - 返回一个对象，包含鼠标在 X 轴和 Y 轴上移动的距离
 */
function useMoveColumn(domEleRef) {
  // 初始化鼠标移动的距离，X 轴和 Y 轴距离都初始化为 0
  const distanceX = ref(0);
  const distanceY = ref(0);

  // 检查传入的 domEleRef 是否是一个有效的 ref，并且其值是一个 HTMLElement
  // 如果不是，则抛出一个错误
  if (!isRef(domEleRef) && unref(domEleRef) instanceof HTMLElement)
    throw new Error('参数不是 ref 或不是 HTML元素');

  // 当组件挂载时，添加鼠标事件监听器
  onMounted(() => {
    // 当鼠标按下时，获取鼠标按下的位置，并监听鼠标移动事件
    // 这里使用解构赋值从事件对象中提取 x 和 y 属性，并将它们分别赋值给 startX 和 startY 变量
    // 事件对象是 mousedown 事件的事件对象，包含了鼠标按下时的位置信息
    unref(domEleRef).addEventListener(
      'mousedown',
      ({ x: startX, y: startY }) => {
        // 重置鼠标移动的距离
        distanceX.value = 0;
        distanceY.value = 0;

        // 定义一个 onMouseMove 函数，用于计算鼠标移动时的位置变化
        // 这里使用解构赋值从事件对象中提取 x 和 y 属性，并将它们分别赋值给 currentX 和 currentY 变量
        // 通过计算当前鼠标位置与起始位置的差值，得到鼠标移动的距离
        const onMouseMove = ({ x: currentX, y: currentY }) => {
          distanceX.value = currentX - startX;
          distanceY.value = currentY - startY;
        };

        // 添加 mousemove 事件监听器，当鼠标移动时调用 onMouseMove 函数
        document.addEventListener('mousemove', onMouseMove);

        // 添加 mouseup 事件监听器，当鼠标释放时移除 mousemove 事件监听器
        document.addEventListener('mouseup', () => {
          // 上一次移动之后，要记录此次底部栏的高度
          bottomBarH.value = layoutSetting.bottomBar.height;
          leftBarW.value = layoutSetting.leftBar.width;
          rightBarW.value = layoutSetting.rightBar.width;
          document.removeEventListener('mousemove', onMouseMove);
        });
      }
    );
  });

  // 返回鼠标移动的距离，包括 X 轴和 Y 轴的距离
  return { distanceX, distanceY };
}

// 对 bottomBar 高度拖动 (与分割线DOM元素绑定)
const elementRef = ref(null);
// 返回鼠标Y轴方向移动的距离
const { distanceY } = useMoveColumn(elementRef);
// 将底部终端 dom 元素的高度设置为响应式数据
const bottomBarH = ref(layoutSetting.bottomBar.height);
watch(distanceY, () => {
  // 更新布局设置，这里假设 updateLayoutSetting 是一个正确的函数
  updateLayoutSetting({
    bottomBar: {
      height: bottomBarH.value - distanceY.value,
    },
  });
});

// 对 leftBar 宽度拖动 (与分割线DOM元素绑定)
const leftBarRef = ref(null);

const { distanceX } = useMoveColumn(leftBarRef);
// 将左侧 dom 元素的高度设置为响应式数据
const leftBarW = ref(layoutSetting.leftBar.width);

watch(distanceX, () => {
  // 更新布局设置，这里假设 updateLayoutSetting 是一个正确的函数
  updateLayoutSetting({
    leftBar: {
      width: leftBarW.value + distanceX.value,
    },
  });
});

// 对 rightBar 宽度拖动 (与分割线DOM元素绑定)
const rightBarRef = ref(null);

const { distanceX: rightBardistanceX } = useMoveColumn(rightBarRef);
// 将左侧 dom 元素的高度设置为响应式数据
const rightBarW = ref(layoutSetting.rightBar.width);

watch(rightBardistanceX, () => {
  // 更新布局设置，这里假设 updateLayoutSetting 是一个正确的函数
  updateLayoutSetting({
    rightBar: {
      width: rightBarW.value - rightBardistanceX.value,
    },
  });
});

const bar1 = reactive({
  a: 1,
  b: 2,
  c: 44,
});
const bar2 = ref({
  a: 1,
  b: 2,
});

const refsBar = toRefs(bar1);
console.log(refsBar.a.value);
console.log(refsBar.b.value);
console.log(refsBar.c.value);
// 将reactive 格式数据转为 原始格式
console.log(JSON.parse(JSON.stringify(toValue(bar1))));

function checkedCallBack(item) {
  console.log('🚀 ~ App.vue:769 ~ checkedCallBack ~ item:', item);
}
</script>

<!-- ===========================CSS样式============================== -->
<!--scoped 表示样式隔离  -->
<style scoped>
@keyframes delayAppearSplitBar {
  0% {
    background-color: transparent;
  }

  50% {
    background-color: transparent;
  }

  100% {
    background-color: #007acc;
  }
}

.highlight:hover {
  animation: delayAppearSplitBar 1s forwards;
}
</style>
