import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mix from 'vite-plugin-mix'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),     
    // mix({
    //   handler: './server/app.js',
    // }),
  ],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.jsx",
    }
  }
})
