import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { getAuthorityMenu } from '@/services/authority';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import routes from '../../config/router.config';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        // 这里的数据通过接口返回菜单页面的权限是什么

        const codeArray = [];
        // eslint-disable-next-line no-inner-declarations
        function ergodicRoutes(routesParam) {
          routesParam.forEach(element => {
            if (element.code) {
              codeArray.push(element.code);
            }
            if (element.routes) {
              ergodicRoutes(element.routes);
            }
          });
        }

        ergodicRoutes(routes);
        const authMenuArray = yield call(getAuthorityMenu, codeArray.join(','));
        localStorage.setItem('routerAutArray', authMenuArray.join(','));

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        // yield put(routerRedux.replace(redirect || '/'));

        // 这里之所以用页面跳转，因为路由的重新设置需要页面重新刷新才可以生效
        window.location.href = redirect || '/';
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        }),
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
