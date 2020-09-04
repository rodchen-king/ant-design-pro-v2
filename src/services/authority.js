import request from '@/utils/request';

// 查询菜单权限
export async function getAuthorityMenu() {
  return request(`/api/authority/menu`);
}

// 查询页面按钮权限
export async function getAuthority(params) {
  return request(`/api/authority?page=${params}`);
}
