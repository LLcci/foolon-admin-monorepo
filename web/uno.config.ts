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

export default defineConfig({
  shortcuts: [],
  rules: [
    [
      'safe-area',
      {
        'padding-bottom': 'constant(safe-area-inset-bottom)',
        // @ts-ignore
        'padding-bottom': 'env(safe-area-inset-bottom)'
      }
    ]
  ],
  theme: {
    breakpoints: {
      xs: '0px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1920px'
    }
  },
  presets: [
    //@ts-ignore
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
