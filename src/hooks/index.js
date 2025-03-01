import { ref, onMounted, reactive, unref, toValue, toRaw } from 'vue';
import _ from 'lodash';
// 导入 settings.json 文件中的数据作为默认数据
import defaultSetting from '../../config/settings.json';
import store from 'store';
// 配置文件内容
console.log('默认配置文件内容', defaultSetting);

/**
 * 在指定的DOM元素外部点击时触发回调函数
 *
 * @param {Object} domRef - 一个包含DOM元素引用的对象，通常是一个React ref
 * @param {Function} callback - 当检测到点击事件发生在指定DOM元素外部时执行的回调函数
 */
export function clickOutside(domRef, callback) {
  // 当组件挂载到DOM后执行的逻辑
  onMounted(function () {
    // 在整个文档上添加点击事件监听器
    document.addEventListener('click', function (e) {
      // 检查点击事件的目标是否在指定的DOM元素内部
      if (!domRef.value.contains(e.target)) {
        // 如果点击事件发生在指定DOM元素外部，则调用回调函数
        callback();
        // 下面的注释代码示例展示了回调函数的一个可能用途：隐藏下拉菜单
        // drowdownVisible.value = false
      }
    });
  });
}

// *****思路******
// 页面刚打开时 从本地存储中读取布局的数据，如果有，就以读取的数据值为准，渲染页面状态
// 当用户拖动分割线时，改变布局的相关数据，用户停止拖动后，重置本地存储的对应数据

export function useSetting(key) {
  // 响应式数据 setting
  const setting = ref(null);

  // 从本地存储中获取数据
  const settingFormCache = store.get('setting');
  
  //有数据
  if (settingFormCache) {
    setting.value = settingFormCache?.[key];
  } else {
    // 无数据
    setting.value = defaultSetting?.[key];
    store.set('setting', defaultSetting);
  }
  function undateSetting() {}

  return { setting, undateSetting };

  // // 响应式数据 config
  // const config = reactive({ setting: null });
  // // 1.在本地存储中获取 数据
  // // 2.若没有数据，则保存默认配置
  // const settingFormCache = store.get('setting');
  // if (!settingFormCache) {
  //   // 刚开始 本地存储没有数据就使用默认配置
  //   // 并将默认配置 本地存储
  //   config.setting = defaultSetting;
  //   store.set('setting', defaultSetting);
  // } else {
  // }
  // // 1.用户更改配置，就将用户 的配置项和默认配置项进行合并 得到一个合并后的对象
  // // 2.将合并后的对象 本地存储
  // function undateSetting(key) {}
  // return { config, undateSetting };
}
