import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
      external: (id) => {
        if (id.includes('fsevents')) return true;
        if (id.endsWith('.py')) return true;
        if (id.includes('/modules/')) return true;
        if (id.includes('/services/')) return true;
        return false;
      }
    }
  }
});
