import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // This tells Rollup to ignore the fsevents module
      external: ['fsevents']
    }
  }
});
