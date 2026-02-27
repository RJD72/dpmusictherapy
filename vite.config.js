import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        aboutMe: resolve(__dirname, "about-me.html"),
        aboutMusic: resolve(__dirname, "about-music-therapy.html"),
        contact: resolve(__dirname, "contact.html"),
        programs: resolve(__dirname, "programs-services.html"),
        privacy: resolve(__dirname, "privacy-policy.html"),
      },
    },
  },
});
