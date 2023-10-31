import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    publicPath: 'https://gitee.com/jch1011/guiguzhenxuan',
    plugins: [
      react(),
      /*  createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),*/
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },

    //代理跨域
    server: {
      proxy: {
        '/api': {
          //获取数据的服务器地址设置
          target: 'http://gmall-h5-api.atguigu.cn',
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
