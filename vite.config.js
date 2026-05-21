import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['fsevents'],
      onwarn(warning, warn) {
        if (warning.ids && warning.ids.some(id => id.includes('fsevents'))) return;
        if (warning.message.includes('fsevents')) return;
        warn(warning);
      }
    }
  }
});
