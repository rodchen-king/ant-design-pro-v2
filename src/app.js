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
  const menuAutArray = (localStorage.getItem('routerAutArray') || '').split(',');

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

    /**
     * 后台接口返回子节点的情况，父节点需要溯源处理
     */
    // notInAut 为true的情况下不需要走逻辑检查
    // if (!element.notInAut) {
    //   if (element.routes) {
    //     // eslint-disable-next-line no-param-reassign
    //     element.routes = customerErgodicRoutes(element.routes);

    //     // eslint-disable-next-line no-param-reassign
    //     if (element.routes.filter(item => item.isNeedSave && !item.hideInMenu).length) {
    //       // eslint-disable-next-line no-param-reassign
    //       element.routes = element.routes.filter(item => item.isNeedSave);
    //       if (element.routes.length) {
    //         // eslint-disable-next-line no-param-reassign
    //         element.isNeedSave = true;
    //       }
    //     }
    //   } else if (menuAutArray.indexOf(element.code) >= 0) {
    //     // eslint-disable-next-line no-param-reassign
    //     element.isNeedSave = true;
    //   }
    // } else {
    //   // eslint-disable-next-line no-param-reassign
    //   element.isNeedSave = true;
    // }

    return element;
  });

  return routes;
}

export function patchRoutes(routes) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority),
  );

  customerErgodicRoutes(routes);

  /**
   * 后台接口返回子节点的情况，父节点需要溯源处理
   */
  window.g_routes = routes.filter(item => !item.isNeedDelete);

  /**
   * 后台接口返回子节点的情况，父节点需要溯源处理
   */
  // window.g_routes = routes.filter(item => item.isNeedSave);
}

export function render(oldRender) {
  authRoutes = '';
  oldRender();
}
