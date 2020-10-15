function getAuthorityMenu(req, res) {
  // 模拟返回的菜单权限
  return res.json([
    'list_menu',
    'list_tableList_page',
    'form_menu',
    'form_basicForm_page',
    'list_tableDetail_page',
    'list_tableCreate_page'
  ]);
}

function getAuthority(req, res) {
  // 模拟返回不同页面的不同权限
  const params = req.query;

  let response = {};

  if (params.codes === '10003,10004') {
    response = [
      {
        type: 3,
        name: '新建-10003',
        actType: 0,
        code: '10003',
      },
      {
        type: 3,
        name: '编辑-10004',
        actType: 0,
        code: '10004',
      },
    ];
  } else {
    response = [
      {
        type: 3,
        name: '创建活动-10001',
        actType: 0,
        code: '10001',
      },
      {
        type: 3,
        name: '编辑-10002',
        actType: 2,
        code: '10002',
      },
      {
        type: 3,
        name: '配置-10005',
        actType: 4,
        code: '10005',
      },
      {
        type: 3,
        name: '订阅警报-10006',
        actType: 8,
        code: '10006',
      },
      {
        type: 3,
        name: '查询详情-20001',
        actType: 16,
        code: '20001',
      },
      {
        type: 3,
        name: '批量操作-10007',
        actType: 32,
        code: '10007',
      },
      {
        type: 3,
        name: '更多操作-10008',
        actType: 64,
        code: '10008',
      },
    ];
  }

  return res.json(response);
}

export default {
  'GET /api/authority/menu': getAuthorityMenu,
  'GET /api/authority': getAuthority,
};
