/* eslint-disable eqeqeq */
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

    return (
      hasAuthorityCodeArray.map(item => item.code).indexOf(code) >= 0 && this.checkDataAuthority()
    ); // 资源权限
  };

  /**
   * 检测数据权限
   */
  checkDataAuthority = () => {
    const {
      globalAuthority: { hasAuthorityCodeArray },
      code, // 当前按钮的code
      actType, // 当前按钮的actType的值通过传递传入
      recordPermissionType, // 单条数据的数据操作权限总和
      actTypeArray,
    } = this.props;

    if (recordPermissionType || actTypeArray) {
      // 单条数据权限校验
      const tempCode = hasAuthorityCodeArray.filter(item => item.code === code);
      let tempActType = '';

      if (actType) {
        tempActType = actType;
      } else if (tempCode.length) {
        tempActType = tempCode[0].actType;
      } else {
        return true; // 默认返回true
      }

      if (actTypeArray) {
        // 批量操作
        return !actTypeArray.some(
          item => !this.checkPermissionType(item.toString(2), tempActType.toString(2)),
        );
      }

      // 单条数据操作
      return this.checkPermissionType(recordPermissionType.toString(2), tempActType.toString(2));
    }

    return true; // 如果字段没有值的情况下，证明不需要进行数据权限
  };

  /**
   * 二进制检查当前当前数据是否具有当前权限
   * @param {*} permissionType
   * @param {*} actType
   */
  checkPermissionType = (permissionType, actType) =>
    // eslint-disable-next-line no-bitwise
    (parseInt(permissionType, 2) & parseInt(actType, 2)).toString(2) == actType;

  render() {
    const { children, code } = this.props;

    return (
      <span style={{ display: this.checkAuthority(code) ? 'inline' : 'none' }}>{children}</span>
    );
  }
}

export default AuthorizedButton;
