import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Login" */ '../User/Login'),
              LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Register" */ '../User/Register'),
              LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__RegisterResult" */ '../User/RegisterResult'),
              LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        code: 'home',
        name: 'home',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Home" */ '../Home'),
              LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                .default,
            })
          : require('../Home').default,
        exact: true,
      },
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        code: 'form_menu',
        routes: [
          {
            path: '/form/basic-form',
            code: 'form_basicForm_page',
            name: 'basicform',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Forms__models__form.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Forms/models/form.js').then(
                      m => {
                        return { namespace: 'form', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Forms/BasicForm'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Forms/BasicForm').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        code: 'list_menu',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            code: 'list_tableList_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__List__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__List__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../List/TableList'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/TableList').default,
            exact: true,
          },
          {
            path: '/List/table-detail',
            hideInMenu: true,
            name: 'detail',
            code: 'list_tableDetail_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__List__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__List__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../List/Detail'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/Detail').default,
            exact: true,
          },
          {
            path: '/List/:title/table-match-detail',
            hideInMenu: true,
            name: 'detail',
            code: 'list_tableDetail_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__List__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__List__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../List/MatchDetail'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/MatchDetail').default,
            exact: true,
          },
          {
            path: '/List/table-create',
            name: 'create',
            code: 'list_tableCreate_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__List__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__List__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../List/Create'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/Create').default,
            isOnlyOnePage: true,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/market',
        icon: 'table',
        name: 'market',
        code: 'list_menu',
        routes: [
          {
            path: '/market/table-market',
            name: 'searchtable',
            code: 'list_tableList_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Market__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Market__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Market/TableList'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Market/TableList').default,
            exact: true,
          },
          {
            path: '/market/table-detail',
            hideInMenu: true,
            name: 'detail',
            code: 'list_tableDetail_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Market__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Market__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Market/Detail'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Market/Detail').default,
            exact: true,
          },
          {
            path: '/market/table-create',
            hideInMenu: true,
            name: 'create',
            code: 'list_tableCreate_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Market__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Market__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Market/Detail'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Market/Detail').default,
            exact: true,
          },
          {
            path: '/market/table-edit',
            hideInMenu: true,
            name: 'edit',
            code: 'list_tableDetail_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Market__models__detail.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/detail.js').then(
                      m => {
                        return { namespace: 'detail', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Market__models__rule.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Market/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Market/Detail'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Market/Detail').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        code: 'profile_menu',
        routes: [
          {
            path: '/profile/basic',
            name: 'basic',
            code: 'profile_basic_page',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Profile__models__profile.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Profile/models/profile.js').then(
                      m => {
                        return { namespace: 'profile', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Profile/BasicProfile'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Profile/BasicProfile').default,
            exact: true,
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            code: 'profile_advanced_page',
            authority: ['admin'],
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Profile__models__profile.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Profile/models/profile.js').then(
                      m => {
                        return { namespace: 'profile', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Profile/AdvancedProfile'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Profile/AdvancedProfile').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        notInAut: true,
        hideInMenu: true,
        path: '/exception',
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Exception__models__error.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Exception/403'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/403').default,
            exact: true,
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Exception__models__error.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Exception/404'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/404').default,
            exact: true,
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Exception__models__error.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Exception/500'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/500').default,
            exact: true,
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Exception__models__error.js' */ '/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../Exception/TriggerException'),
                  LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/TriggerException').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        notInAut: true,
        path: '/404',
        code: '404',
        name: '404',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
