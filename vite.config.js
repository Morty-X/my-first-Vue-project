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
    open: './index.html',
    proxy: {
      // 当检测到我的路径是以 veet 开头，这个路径就会别代理
      // 选项写法
      "/veet": {
        target: 'http://127.0.0.1:3088',
        // 路径重写
        rewrite: (path) => path.replace(/^\/veet/, ''),
      }
    }
  },

  resolve: {
    // 路径别名映射 相当于是绝对路径
    alias: {
      "@": path.resolve('./src')
    }
  }

})
