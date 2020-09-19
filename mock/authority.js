function getAuthorityMenu(req, res) {
  // 模拟返回的菜单权限
  return res.json(['list_menu', 'list_tableList_page', 'form_menu', 'form_basicForm_page']);
}

function getAuthority(req, res) {
  // 模拟返回不同页面的不同权限
  const params = req.query;

  let response = {};

  if (params.codes === '10003,10004') {
    response = ['10003', '10004'];
  } else {
    response = ['10001', '10002', '10005', '20001'];
  }

  return res.json(response);
}

export default {
  'GET /api/authority/menu': getAuthorityMenu,
  'GET /api/authority': getAuthority,
};
