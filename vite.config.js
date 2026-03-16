import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { fileURLToPath } from 'url' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    historyApiFallback: true,
  },
})

// Exemplo seguido:

// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vite.dev/config/
// export default defineConfig({
//   base: "./",
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
// });
