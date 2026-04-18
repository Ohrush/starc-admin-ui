import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import { setupVitePlugins } from './build/plugins';
import { getBuildTime } from './build/config';

// https://vite.dev/config/
export default defineConfig(configEnv => {

  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;

  const buildTime = getBuildTime();

  return {
    plugins: setupVitePlugins(viteEnv, buildTime),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
