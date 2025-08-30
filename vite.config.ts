import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // This part tells Vite to make the API key available in your app
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      // This part helps with file paths in your code
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // **THIS IS THE NEW, IMPORTANT PART**
      // This tells Vite where to find the main HTML file for your application
      build: {
        rollupOptions: {
          input: 'index.html'
        }
      }
    };
});
