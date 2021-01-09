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

module.exports = {
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
  port: 3000,
  // 是否自动在浏览器打开
  open: false,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src'),
    img: path.resolve(__dirname, './src/assets/images'),
    css: path.resolve(__dirname, './src/assets/css')
    // '/@components/': path.resolve(__dirname, './src/components')
  },
  proxy: {
    '/wxmp/*': {
      target: process.env.VITE_APP_ROOT,
      changeOrigin: true
    }
  }
}
