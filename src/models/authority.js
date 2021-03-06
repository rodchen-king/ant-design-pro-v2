/*
 * @Date: 2020-09-07 11:47:36
 * @LastEditTime: 2020-09-07 11:49:17
 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { getAuthority } from '@/services/authority';
import { unionBy, uniq } from 'lodash';

export default {
  namespace: 'globalAuthority',

  state: {
    hasAuthorityCodeArray: [], // 获取当前具有权限的资源code
    pageCodeArray: [], // 用来存储当前页面存在的资源code
    codeAuthorityObject: {}, // 页面code对应的权限
  },

  effects: {
    /**
     * 获取当前页面的权限控制
     */
    *getAuthorityForPage({ payload }, { put, call, select }) {
      const originNalHasAuthorityCodeArray = yield select(
        state => state.globalAuthority.hasAuthorityCodeArray,
      );
      const originNalCodeAuthorityObject = yield select(
        state => state.globalAuthority.codeAuthorityObject,
      );
      // 这里的资源code都是自己加载的
      const pageCodeArray = yield select(state => state.globalAuthority.pageCodeArray);
      const response = yield call(getAuthority, uniq(pageCodeArray));
      const hasAuthorityCodeArray = response || [];
      const codeAuthorityObject = {};

      pageCodeArray.forEach((value, index, array) => {
        codeAuthorityObject[value] =
          hasAuthorityCodeArray.map(item => item.code).indexOf(value) >= 0;
      });

      yield put({
        type: 'save',
        payload: {
          hasAuthorityCodeArray: unionBy(
            originNalHasAuthorityCodeArray.concat(hasAuthorityCodeArray),
            'code',
          ),
          codeAuthorityObject: { ...originNalCodeAuthorityObject, ...codeAuthorityObject },
        },
      });
    },

    *plusCode({ payload }, { put, select }) {
      // 组件累加当前页面的code，用来发送请求返回对应的权限code
      const { codeArray = [] } = payload;
      const pageCodeArray = yield select(state => state.globalAuthority.pageCodeArray);

      yield put({
        type: 'save',
        payload: {
          pageCodeArray: uniq(pageCodeArray.concat(codeArray)),
        },
      });
    },

    // eslint-disable-next-line no-unused-vars
    *resetAuthorityForPage({ payload }, { put, call }) {
      yield put({
        type: 'save',
        payload: {
          hasAuthorityCodeArray: [],
          pageCodeArray: [],
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
