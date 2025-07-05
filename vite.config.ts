import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  name: "beslutify",
  short_name: "beslutify",
  display: "standalone",
  scope: "/beslutify/",
  start_url: "/beslutify/",
  orientation: "landscape",
  background_color: "#006989",
  theme_color: "#006989",
  icons: [
    {
      src: "/beslutify/icons/beslutify-icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/beslutify/icons/beslutify-icon-512.png",
      sizes:
        "72x72 96x96 128x128 144x144 152x152 192x192 256x256 384x384 512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: "/beslutify/",
});
