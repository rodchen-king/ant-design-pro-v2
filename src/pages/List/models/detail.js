/* eslint-disable require-yield */
import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { updateWrapperModel } from '@/utils/withSubscription';

const initDataExampl = {
  data: {
    name: '',
  },
};

export default {
  namespace: 'detail',

  state: {},

  effects: {
    *getExample({ callback }) {
      if (callback) callback({ ...initDataExampl });
    },
    *initData({ payload }, { put }) {
      yield put({
        type: 'init',
        payload: {
          [payload.primaryKey]: {
            ...initDataExampl,
          },
        },
      });
    },

    *fetch({ payload }, { put, select }) {
      const { params, primaryKey } = payload;

      const currentPrimaryKeyState = yield select(state => state.detail[primaryKey]);

      yield put({
        type: 'save',
        payload: updateWrapperModel('data', params, primaryKey, currentPrimaryKeyState),
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    init(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
