/* eslint-disable require-yield */
import { updateWrapperModel } from '@/utils/withSubscription';

const initDataExample = {
  data: {
    name: '',
  },
};

export default {
  namespace: 'detail',

  state: {},

  effects: {
    *getExample({ callback }) {
      if (callback) callback({ ...initDataExample });
    },
    *initData({ payload }, { put }) {
      yield put({
        type: 'init',
        payload: {
          [payload.primaryKey]: {
            ...initDataExample,
          },
        },
      });
    },

    *fetch({ payload, primaryKey }, { put, select }) {
      const currentPrimaryKeyState = yield select(state => state.detail[primaryKey]);

      yield put({
        type: 'save',
        payload: updateWrapperModel({ data: payload }, primaryKey, currentPrimaryKeyState),
      });
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
