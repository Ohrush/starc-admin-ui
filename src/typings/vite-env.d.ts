declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    readonly VITE_BASE_URL: string;
    /** The title of the application */
    readonly VITE_APP_TITLE: string;
    /** The router history mode */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode;
    /**
     * The home route key
     *
     * It only has effect when the auth route mode is static, if the route mode is dynamic, the home route key is
     * defined in the back-end
     */
    readonly VITE_ROUTE_HOME: import("@elegant-router/types").LastLevelRouteKey;

    /**
     * The auth route mode
     *
     * - Static: the auth routes is generated in front-end
     * - Dynamic: the auth routes is generated in back-end
     */
    readonly VITE_AUTH_ROUTE_MODE: "static" | "dynamic";
  }

  type RouterHistoryMode = "hash" | "history" | "memory";
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
