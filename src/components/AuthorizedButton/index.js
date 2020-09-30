import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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

    return hasAuthorityCodeArray.indexOf(code) >= 0 && this.checkDataAuthority(); // 资源权限
  };

  /**
   * 检测数据权限
   */
  checkDataAuthority = () => {
    const {
      globalAuthority: { dataAuthorityForRecordType, rowsBttonAuthotityInRecordType },
      recordType,
      buttonType,
      dataTypeArray,
    } = this.props;

    if (recordType && buttonType) {
      const recordAuthorityObject = dataAuthorityForRecordType[recordType];

      if (_.isArray(recordAuthorityObject)) {
        return recordAuthorityObject.indexOf(buttonType) >= 0;
      }

      return false;
    }

    if (dataTypeArray) {
      console.log(dataTypeArray);
    }

    return true; // 如果字段没有值的情况下，证明不需要进行数据权限
  };

  render() {
    const { children, code } = this.props;

    return (
      <span style={{ display: this.checkAuthority(code) ? 'inline' : 'none' }}>{children}</span>
    );
  }
}

export default AuthorizedButton;
