import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id) => id.includes('fsevents'),
      onwarn(warning, warn) {
        if (warning.message.includes('fsevents')) return;
        warn(warning);
      }
    }
  }
});
