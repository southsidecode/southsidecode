// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5174,            // default dev server port
    strictPort: true,       // fail if port is busy
    open: true,             // auto-open browser
    hmr: {
      overlay: true,        // show error overlay
    },
    watch: {
      usePolling: false,    // faster reload, avoid constant polling
      ignored: [
        '**/node_modules/**',       // ignore dependencies
        '**/assets/videos/**',      // exclude heavy videos from HMR
        '**/dist/**',               // exclude built files
      ],
    },
  },

  optimizeDeps: {
    include: [
      'bootstrap',    // pre-bundle frequently used libs
      'bootstrap-icons'
    ],
    exclude: [
      'large-unused-lib' // placeholder for any heavy lib you don't need
    ]
  },

  build: {
    target: 'esnext',       // modern browsers, faster builds
    minify: 'esbuild',      // fastest minifier
  },

  // Optional: alias for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

