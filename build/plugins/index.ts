import type { PluginOption } from "vite";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';


export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    // setupDevtoolsPlugin(viteEnv),
    // setupElegantRouter(),
    // setupUnocss(viteEnv),
    // ...setupUnplugin(viteEnv),
    // progress(),
    // setupHtmlPlugin(buildTime),
    // vueRootValidator()
  ];

  return plugins;
}
