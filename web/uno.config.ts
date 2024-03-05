// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  shortcuts: [],
  rules: [
    [
      'safe-area',
      {
        'padding-bottom': 'constant(safe-area -inset-bottom)',
        // @ts-ignore
        'padding-bottom': 'env(safe-area-inset-bottom)'
      }
    ]
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    //@ts-ignore
    presetRemToPx(),
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
