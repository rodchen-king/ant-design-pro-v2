import fetch from 'dva/fetch';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};

let authRoutes = null;

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

function customerErgodicRoutes(routes) {
  const menuAutArray = localStorage.getItem('routerAutArray').split(',');

  routes.forEach(element => {
    // 没有path的情况下不需要走逻辑检查
    // path 为 /user 不需要走逻辑检查
    if (element.path === '/user' || !element.path) {
      return element;
    }

    // notInAut 为true的情况下不需要走逻辑检查
    if (!element.notInAut) {
      if (menuAutArray.indexOf(element.code) >= 0 || element.path === '/') {
        if (element.routes) {
          // eslint-disable-next-line no-param-reassign
          element.routes = customerErgodicRoutes(element.routes);

          // eslint-disable-next-line no-param-reassign
          element.routes = element.routes.filter(item => !item.isNeedDelete);
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        element.isNeedDelete = true;
      }
    }
    return element;
  });

  return routes;
}

export function patchRoutes(routes) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority),
  );

  customerErgodicRoutes(routes);

  window.g_routes = routes.filter(item => !item.isNeedDelete);
}

export function render(oldRender) {
  fetch('/api/auth_routes')
    .then(res => res.json())
    .then(ret => {
      authRoutes = ret;
      oldRender();
    });
}
