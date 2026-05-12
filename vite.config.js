import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/gsap")) return "gsap";
          if (id.includes("node_modules/@emailjs")) return "emailjs";
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("node_modules/aos")) return "aos";
        },
      },
    },
  },
});
