// import './main.css'
import '@/main.css'

// 导入Vue的核心功能模块 
// 作用：创建一个Vue应用
import { createApp } from 'vue'


// 导入全局样式文件，用于统一管理项目的样式
// import './style.scss'

// 导入Vue应用的根组件
// 组件：具备HTML+CSS+JS的一个HTML片段

// Vue 自定义的一中组织HTML+CSS+JS的一种文件格式
// 作用:替代现有的 HTML+CSS+JS 文件组织代码的方式
// 规范： .vue文件中有很多代码块，其中官方规定的有 template，style,script代码块中
// DOM操作  指令语法替代
// 不允许使用DOM操作

import App from './App.vue'

// 创建 Vue 应用实例并挂载到 DOM 中
createApp(App).mount('#app')
