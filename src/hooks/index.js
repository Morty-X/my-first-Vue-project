import { ref, onMounted, reactive, toRef, unref, toValue, toRaw } from 'vue';
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
export function useClickOutside(domRef, callback) {
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

/**
 * 自定义设置钩子
 * 用于管理和更新应用的设置，包括从本地存储加载设置和更新设置
 *
 * @param {string} key 设置的键名，用于在本地存储中标识设置
 * @returns {Object} 返回一个对象，包含当前设置和更新设置的方法
 */
export function useSetting(key) {
  // 响应式数据 setting
  const config = reactive({ setting: null });

  // 从本地存储中获取数据
  const settingFormCache = store.get('setting');

  // 如果本地存储中没有设置数据，则使用默认设置
  if (!settingFormCache) {
    config.setting = defaultSetting;
    store.set('setting', defaultSetting);
  } else {
    // 加载本地存储中的设置
    config.setting = settingFormCache;
  }

  /**
   * 更新设置的方法
   * 接受一个参数对象，用于更新当前设置
   *
   * @param {Object} params 要更新的设置参数
   */
  const updateSetting = (params) => {
    // 使用lodash的merge函数合并新的设置，仅更新布局相关的设置
    const setting = _.merge(config.setting, { layout: { ...params } });
    config.setting = setting;
    store.set('setting', setting);
  };

  // 返回当前设置和更新设置的方法
  return { setting: toRef(config, 'setting').value[key], updateSetting };
}

export function sendApiRequest(
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
