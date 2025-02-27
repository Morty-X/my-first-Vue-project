import { ref, onMounted } from 'vue'
// 
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
                callback()
                // 下面的注释代码示例展示了回调函数的一个可能用途：隐藏下拉菜单
                // drowdownVisible.value = false
            }
        })
    })
}

