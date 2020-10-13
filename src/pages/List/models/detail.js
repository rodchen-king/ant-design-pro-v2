/* eslint-disable require-yield */
import { queryRule, removeRule, addRule, updateRule } from '@/services/api';

const initDataExampl = {
  info: {
    name: ''
  }
}

export default {
  namespace: 'detail',

  state: {
    dataGroup: {
    },
  },

  effects: {
    *getExample({callback}) {
      if (callback) callback({...initDataExampl})
    },
    *initData({payload}, { put }) {
      yield put({
        type: 'init',
        payload: {
          [payload]: {
            ...initDataExampl
          }
        }
      }) 
    } ,

    *fetch({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          ...payload,
        },
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
      debugger
      return {
        ...state,
        dataGroup: {
          ...state.dataGroup,
          ...action.payload
        }
      }
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
