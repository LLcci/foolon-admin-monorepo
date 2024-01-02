import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'

import pxtovw from 'postcss-px-conversion'
const loder_pxtovw = pxtovw({
  viewportWidth: 375,
  //@ts-ignore
  viewportUnit: 'vw',
  unitPrecision: 5,
  //@ts-ignore
  fontViewportUnit: 'vw',
  allowMediaQuery: true,
  enableLandscape: true,
  //@ts-ignore
  landscapeUnit: 'vw',
  landscapeViewportWidth: 1920
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  }
})
