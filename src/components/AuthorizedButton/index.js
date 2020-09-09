import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

@connect(({ globalAuthority }) => ({
  globalAuthority,
}))
class AuthorizedButton extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool,
  };

  componentWillMount() {
    // extendcode 扩展表格中的code还没有出现的情况
    const {
      dispatch,
      code,
      extendCode = [],
      globalAuthority: { pageCodeArray },
    } = this.props;

    let codeArray = [];

    if (code) {
      codeArray.push(code);
    }

    if (extendCode && extendCode.length) {
      codeArray = codeArray.concat(extendCode);
    }

    // code已经存在，证明是页面数据渲染之后或者弹出框的按钮资源，不需要走dva了
    if (pageCodeArray.indexOf(code) >= 0) {
      return;
    }

    dispatch({
      type: 'globalAuthority/plusCode',
      payload: {
        codeArray,
      },
    });
  }

  checkAuthority = code => {
    const {
      globalAuthority: { hasAuthorityCodeArray },
    } = this.props;

    return hasAuthorityCodeArray.indexOf(code) >= 0; // 资源权限
  };

  render() {
    const { children, code } = this.props;

    return (
      <span style={{ display: this.checkAuthority(code) ? 'inline' : 'none' }}>{children}</span>
    );
  }
}

export default AuthorizedButton;
