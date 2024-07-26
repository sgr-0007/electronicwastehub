import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // ... other build options
    chunkSizeWarningLimit: 1000 * 1024, // Set limit to 1MB (default is 500 kB)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
},
)
