import type { RouteKey } from "@elegant-router/types";
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from "vue-router";
import { useRouteStore } from "@/store/modules/route";

/**
 * create route guard
 *
 * @param router router instance
 */
export function createRouteGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const location = await initRoute(to);

    if (location) {
      return location;
    }
    const rootRoute: RouteKey = "root";
    const loginRoute: RouteKey = "login";
    const noAuthorizationRoute: RouteKey = "403";

    const isLogin = Boolean(true);
    const needLogin = !to.meta.constant;
    const routeRoles = to.meta.roles || [];

    // if it is login route when logged in, then switch to the root page
    if (to.name === loginRoute && isLogin) {
      return { name: rootRoute };
    }
    // if the route does not need login, then it is allowed to access directly
    if (!needLogin) {
      return handleRouteSwitch(to, from);
    }

    // the route need login but the user is not logged in, then switch to the login page
    if (!isLogin) {
      return { name: loginRoute, query: { redirect: to.fullPath } };
    }

    // // if the user is logged in but does not have authorization, then switch to the 403 page
    // if (!hasAuth) {
    //   return { name: noAuthorizationRoute };
    // }
    // already on root route, continue navigation
    // switch route normally
    return handleRouteSwitch(to, from);

    // const authStore = useAuthStore();

    // const rootRoute: RouteKey = "root";
    // const loginRoute: RouteKey = "login";
    // const noAuthorizationRoute: RouteKey = "403";

    // const isLogin = Boolean(localStg.get("token"));
    // const needLogin = !to.meta.constant;
    // const routeRoles = to.meta.roles || [];

    // const hasRole = authStore.userInfo.roles.some((role) =>
    //   routeRoles.includes(role),
    // );
    // const hasAuth = authStore.isStaticSuper || !routeRoles.length || hasRole;

    // // if it is login route when logged in, then switch to the root page
    // if (to.name === loginRoute && isLogin) {
    //   return { name: rootRoute };
    // }

    // // if the route does not need login, then it is allowed to access directly
    // if (!needLogin) {
    //   return handleRouteSwitch(to, from);
    // }

    // // the route need login but the user is not logged in, then switch to the login page
    // if (!isLogin) {
    //   return { name: loginRoute, query: { redirect: to.fullPath } };
    // }

    // // if the user is logged in but does not have authorization, then switch to the 403 page
    // if (!hasAuth) {
    //   return { name: noAuthorizationRoute };
    // }

    // // switch route normally
    // return handleRouteSwitch(to, from);
  });
}

async function initRoute(
  to: RouteLocationNormalized,
): Promise<RouteLocationRaw | null> {
  const routeStore = useRouteStore();
  const notFoundRoute: RouteKey = "not-found";
  const isNotFoundRoute = to.name === notFoundRoute;

  if (!routeStore.isInitConstantRoute) {
    await routeStore.initConstantRoute();

    const path = to.fullPath;
    const location: RouteLocationRaw = {
      path,
      replace: true,
      query: to.query,
      hash: to.hash,
    };

    return location;
  }

  if (!isNotFoundRoute) {
    return null;
  }
  return null;
}

function handleRouteSwitch(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) {
  // route with href
  if (to.meta.href) {
    window.open(to.meta.href, "_blank");

    return {
      path: from.fullPath,
      replace: true,
      query: from.query,
      hash: to.hash,
    };
  }
}
