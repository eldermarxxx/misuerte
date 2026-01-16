import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // 🔥 Necessário quando roda no Render com preview
    preview: {
      allowedHosts: 'all',
    },

    // ⚠️ server é só dev, mas não atrapalha
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // 🔑 Variáveis de ambiente
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY),
    },

    // 🧠 Alias de import
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // 📦 Build segura para SPA
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
