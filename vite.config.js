import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration — React plugin enables JSX + Fast Refresh.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to IPv4 loopback explicitly. The Vite default can resolve to an
    // IPv6-only address (::1) on Windows, which leaves browsers that use
    // 127.0.0.1 for "localhost" unable to connect (page never loads).
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
    open: true,
  },
})
