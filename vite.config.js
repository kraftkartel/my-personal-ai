import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
      external: (id) => {
        return id.includes('fsevents') || 
               id.includes('.py') ||
               id.startsWith('node:');
      }
    }
  }
});
