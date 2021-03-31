import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'
import { defineConfig } from 'vite'
const path = require('path')
const fs = require('fs')

// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
const dotenv = require('dotenv')

const envFiles = [
  /** default file */ `.env.production`,
  /** mode file */ `.env.development`,
  /** mode file */ `.env.alpha`
]

for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

export default defineConfig({
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  // 服务端渲染
  ssr: false,
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file
              return false
            }
            return `vant/es/${name}/index.css`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/images')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': process.env.VITE_APP_ROOT
    }
  }
})
