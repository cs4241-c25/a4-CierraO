import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
//import withMT from "@material-tailwind/react/utils/withMT";

//const config = defineConfig({
//  plugins: [
//    tailwindcss(),
//    react()
//  ],
//  server: {
//    proxy: {
//      '/api': 'http://localhost:3000'
//    }
//  }
//});
//
//export default withMT(config);


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'https://a4-cierrao-api.onrender.com',
      '/auth': 'https://a4-cierrao-api.onrender.com'
    }
  }
});