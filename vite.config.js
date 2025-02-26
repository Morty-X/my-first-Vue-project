import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import dns from 'node:dns'
import path from 'path'
// 配置语法提示
dns.setDefaultResultOrder('verbatim')


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    port: 9527,
    open: './index.html'
  },
  
  resolve: {
    // 路径别名映射 相当于是绝对路径
    alias: {
      "@": path.resolve('./src')
    }
  }

})
