import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
  css: {
    transformer: 'lightningcss', // Use Lightning CSS for CSS transforms
    lightningcss: {
      // Specify target browsers for compatibility
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  build: {
    cssMinify: 'lightningcss', // Use Lightning CSS for CSS minification
  },
  plugins: [preact()],
})
