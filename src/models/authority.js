/*
 * @Date: 2020-09-07 11:47:36
 * @LastEditTime: 2020-09-07 11:49:17
 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { getAuthority } from '@/services/authority';

export default {
  namespace: 'globalAuthority',

  state: {
    dataAuthorityForRecordType: {
      '1': ['peizhi', 'dingyuejingbao', 'piliangcaozuo', 'gengduocaozuo'], // 输入单据: 配置权限，订阅警报权限，批量操作权限，更多操作权限
      '2': ['piliangcaozuo', 'gengduocaozuo'], // 输出单据: 批量操作权限，更多操作权限
      '3': ['peizhi', 'gengduocaozuo'], // 删除单据: 配置权限，更多操作权限
      '4': ['dingyuejingbao', 'piliangcaozuo'], // 驳回单据: 订阅警报权限，批量操作权限
    },
    rowsBttonAuthotityInRecordType: {
      peizhi: ['1', '3'], // 配置按钮：输入单据，删除单据
      dingyuejingbao: ['1', '4'], // 订阅警报权限：输入单据，输出单据，驳回单据
      piliangcaozuo: ['1', '2', '4'], // 批量操作权限：输入单据，删除单据
      gengduocaozuo: ['1', '2', '3'], // 更多操作权限：输入单据，输出单据，删除单据
    },
    hasAuthorityCodeArray: [], // 获取当前具有权限的资源code
    pageCodeArray: [], // 用来存储当前页面存在的资源code
    codeAuthorityObject: {}, // 页面code对应的权限
  },

  effects: {
    /**
     * 获取当前页面的权限控制
     */
    *getAuthorityForPage({ payload }, { put, call, select }) {
      // 这里的资源code都是自己加载的
      const pageCodeArray = yield select(state => state.globalAuthority.pageCodeArray);
      const response = yield call(getAuthority, pageCodeArray);
      const hasAuthorityCodeArray = response || [];
      const codeAuthorityObject = {};

      pageCodeArray.forEach((value, index, array) => {
        codeAuthorityObject[value] = hasAuthorityCodeArray.indexOf(value) >= 0;
      });

      // debugger
      yield put({
        type: 'save',
        payload: {
          hasAuthorityCodeArray,
          codeAuthorityObject,
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
          pageCodeArray: pageCodeArray.concat(codeArray),
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
