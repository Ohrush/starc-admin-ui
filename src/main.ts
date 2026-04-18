import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store';
import { setupRouter } from './router';

async function setupApp() {
  //   setupLoading();

  //   setupNProgress();

  //   setupIconifyOffline();

  //   setupDayjs();

  const app = createApp(App);

  setupStore(app);

  await setupRouter(app);

  //   setupI18n(app);

  //   setupAppVersionNotification();

  //   setupVueRootValidator(app, {
  //     lang: getLocale() === 'zh-CN' ? 'zh' : 'en'
  //   });

  app.mount('#app');
}

setupApp();
