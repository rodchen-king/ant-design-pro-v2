export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      {
        path: '/',
        code: 'home',
        name: 'home',
        hideInMenu: true,
        component: './Home',
      },
      // forms
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
            component: './Forms/BasicForm',
          },
        ],
      },
      // list
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
            component: './List/TableList',
          },
          {
            path: '/List/table-detail',
            hideInMenu: true,
            name: 'detail',
            code: 'list_tableDetail_page',
            component: './List/Detail',
          },
          {
            path: '/List/:title/table-match-detail',
            hideInMenu: true,
            name: 'detail',
            code: 'list_tableDetail_page',
            component: './List/MatchDetail',
          },
          {
            path: '/List/table-create',
            // hideInMenu: true,
            name: 'create',
            code: 'list_tableCreate_page',
            component: './List/Create',
            isOnlyOnePage: true,
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
            component: './Market/TableList',
          },
          {
            path: '/market/table-detail',
            hideInMenu: true,
            name: 'detail',
            code: 'list_tableDetail_page',
            component: './Market/Detail',
          },
          {
            path: '/market/table-create',
            hideInMenu: true,
            name: 'create',
            code: 'list_tableCreate_page',
            component: './Market/Detail',
          },
          {
            path: '/market/table-edit',
            hideInMenu: true,
            name: 'edit',
            code: 'list_tableDetail_page',
            component: './Market/Detail',
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        code: 'profile_menu',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            code: 'profile_basic_page',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            code: 'profile_advanced_page',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
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
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        notInAut: true,
        path: '/404',
        code: '404',
        name: '404',
        hideInMenu: true,
        component: '404',
      },
    ],
  },
];
