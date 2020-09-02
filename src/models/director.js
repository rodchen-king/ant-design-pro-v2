/* eslint-disable no-prototype-builtins */
import * as services from "@/services/director";
import { handleError } from "@/utils/utils";
import _ from "lodash";

export default {
  namespace: "dictionary",

  state: {
    // 对应后台字典集合
    backendDictionaryMap: {
      class: "10"
    },

    // 通过方法获取字典
    methodDictionaryMap: {
      brand: "getBrandListInModal"
    },

    // state值
    brand: [],
    class: []
  },

  effects: {
    /**
     * 批量获取字典集数据
     * @param {*} codeList      字典集数组
     * @param {*} codeParams    字典集参数数组
     */
    *getDictionaryBatchInModal({ payload }, { put, select }) {
      const { codeList = [], codeParams = {} } = payload;
      // 类型检查
      if (!_.isArray(codeList)) {
        throw new TypeError("dictinoary字典集参数必须为数组");
      }

      if (!codeList.length) {
        // eslint-disable-next-line no-console
        console.warn("dictinoary字典集参数为空数组");
        return;
      }

      // 定义变量
      const promiseArray = []; // promise接口请求封装集合
      const stateDictionaryMap = yield select(state => state.dictionary); // 获取字典modal对应的state mapping
      const { backendDictionaryMap, methodDictionaryMap } = stateDictionaryMap;

      // 遍历业务页面调用传入的字典code集合
      for (let index = 0; index < codeList.length; index += 1) {
        const codeName = codeList[index];

        if (!stateDictionaryMap.hasOwnProperty(codeName)) {
          throw new Error(`字典state中不存在code-${codeName}对应的状态state`);
        }

        if (
          !backendDictionaryMap.hasOwnProperty(codeName) &&
          !methodDictionaryMap.hasOwnProperty(codeName)
        ) {
          throw new Error(`字典没有与code-${codeName}对应的获取数据的方法`);
        }

        let promise;

        if (backendDictionaryMap.hasOwnProperty(codeName)) {
          promise = yield put({
            type: "getBackendDictionaryInModal",
            payload: { type: backendDictionaryMap[codeName] }
          });
        } else {
          promise = yield put({
            type: methodDictionaryMap[codeName],
            payload: { ...codeParams[codeName] }
          });
        }

        promiseArray.push(promise);
      }

      const promiseReturnArray = yield Promise.all(promiseArray);

      yield put({
        type: "save",
        payload: _.zipObject(codeList, promiseReturnArray) // lodash方法
      });
    },

    /**
     * 重置字典集为空，或者传入数据重置
     * @param {*} codeList      字典集数组
     * @param {*} codeParams    字典集参数数组
     */
    *resetDicBatch({ payload }, { put }) {
      const { codeList = [], codeParams = {} } = payload;

      // 类型检查
      if (!_.isArray(codeList)) {
        throw new TypeError("dictinoary字典集参数必须为数组");
      }

      if (!codeList.length) {
        // eslint-disable-next-line no-console
        console.warn("dictinoary字典集参数为空数组");
        return;
      }

      const resetDictionaryValue = {};

      codeList.forEach(value => {
        resetDictionaryValue[value] = codeParams[value] || []; // 如果参数中传入了对应重置的数据，则重置数据，否则重置为空数组
      });

      yield put({
        type: "save",
        payload: resetDictionaryValue
      });
    },

    /**
     * 获取后段字典集数据
     * @param {*} { type: 1 }  ** type: 字典集类型
     */
    *getBackendDictionaryInModal({ payload }, { call }) {
      const response = yield call(services.getDictionary, payload);
      if (handleError(response)) {
        return response.data;
      }
      return [];
    },

    // 查询 品牌
    *getBrandListInModal({ payload }, { call }) {
      const response = yield call(services.fetchBrandList, payload);
      if (handleError(response)) {
        return response.data.map(d => ({
          id: d.id,
          value: d.name,
          valueCode: d.brandCode
        }));
      }
      return [];
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
