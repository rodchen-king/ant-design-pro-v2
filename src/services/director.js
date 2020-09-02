import { stringify } from "qs";
import request from "@/utils/request";
import baseUrl from "@/services/baseUrl";

/**
 * 查询下拉框字典枚举值  共用service文件
 */

// 查询字典值
export async function getDictionary(params) {
  return request(
    `${baseUrl}/dictionary/getDictionaryList?${stringify(params)}`
  );
}

/**
 * 商品管理  公有接口
 * @param {*} params
 */

// 查询所有品牌
export async function fetchBrandList(params) {
  return request(`${baseUrl}/brand?${stringify(params)}`);
}
