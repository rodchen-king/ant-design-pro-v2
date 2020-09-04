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
    const { dispatch, code } = this.props;

    dispatch({
      type: 'globalAuthority/plusCode',
      payload: {
        code,
      },
    });
  }

  checkAuthority = code => {
    const {
      globalAuthority: { hasAuthorityCodeArray },
    } = this.props;

    return hasAuthorityCodeArray.indexOf(code) >= 0;
  };

  render() {
    const { children, code } = this.props;

    return (
      <span style={{ display: this.checkAuthority(code) ? 'inline' : 'none' }}>{children}</span>
    );
  }
}

export default AuthorizedButton;
