import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeader from '@/components/PageHeader';
import { connect } from 'dva';
import MenuContext from '@/layouts/MenuContext';
import { Spin } from 'antd';
import GridContent from './GridContent';
import styles from './index.less';

class PageHeaderWrapper extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'globalAuthority/getAuthorityForPage', // 发送请求获取当前页面的权限code
    });
  }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'globalAuthority/resetAuthorityForPage',
  //   });
  // }

  render() {
    const { children, contentWidth, wrapperClassName, top, loading, ...restProps } = this.props;

    return (
      <Spin spinning={loading}>
        <div
          style={{
            paddingBottom: '20px',
            margin: '-30px -20px 20px',
            height: 'calc(100% - 40px)',
            overflow: 'scroll',
          }}
          className={wrapperClassName}
        >
          {top}
          {/* <MenuContext.Consumer>
            {value => (
              <PageHeader
                wide={contentWidth === 'Fixed'}
                home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
                {...value}
                key="pageheader"
                {...restProps}
                linkElement={Link}
                itemRender={item => {
                  if (item.locale) {
                    return <FormattedMessage id={item.locale} defaultMessage={item.title} />;
                  }
                  return item.title;
                }}
              />
            )}
          </MenuContext.Consumer> */}
          {children ? (
            <div className={styles.content}>
              <GridContent>{children}</GridContent>
            </div>
          ) : null}
        </div>
      </Spin>
    );
  }
}

export default connect(({ setting, globalAuthority, loading }) => ({
  contentWidth: setting.contentWidth,
  globalAuthority,
  loading: loading.models.globalAuthority,
}))(PageHeaderWrapper);
