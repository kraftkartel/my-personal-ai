import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['fsevents'],
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT' && 
            warning.source === 'fsevents') return;
        warn(warning);
      }
    }
  }
});
