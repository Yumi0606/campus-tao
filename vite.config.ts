import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import autoImport from 'unplugin-auto-import/vite'
import path from 'path'

// 全局常量
const BASE_PATH = process.env.BASE_PATH || '/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react(),
    tailwindcss(),
    autoImport({
      imports: [
        'react',
        'react-router-dom',
        'react-i18next',
      ],
      dts: './src/auto-imports.d.ts',
      resolvers: [],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify(BASE_PATH),
  },
})