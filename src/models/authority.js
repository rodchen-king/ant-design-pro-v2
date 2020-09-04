/* eslint-disable no-prototype-builtins */
import { getAuthority } from '@/services/authority';

export default {
  namespace: 'globalAuthority',

  state: {
    authority: {},
  },

  effects: {
    /**
     * 获取当前页面的权限控制
     * @param {*} codeList      字典集数组
     * @param {*} codeParams    字典集参数数组
     */
    *getAuthorityForPage({ payload }, { put, call }) {
      const { page } = payload;

      const response = yield call(getAuthority, page);

      yield put({
        type: 'save',
        payload: response,
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
