function getAuthorityMenu(req, res) {
  // 模拟返回的菜单权限
  return res.json(['list_menu', 'list_tableList_page', 'form_menu', 'form_basicForm_page']);
}

function getAuthority(req, res) {
  // 模拟返回不同页面的不同权限
  const params = req.query;

  let response = {};

  if (params.page === 'form') {
    response = {
      authority: {
        add: true,
        import: true,
        export: true,
        distribution: true,
        notifyDeliver: true,
        finish: true,
        void: true,
      },
    };
  } else {
    response = {
      authority: {
        add: false,
        import: true,
        export: true,
        distribution: true,
        notifyDeliver: true,
        finish: true,
        void: true,
      },
    };
  }

  return res.json(response);
}

export default {
  'GET /api/authority/menu': getAuthorityMenu,
  'GET /api/authority': getAuthority,
};
