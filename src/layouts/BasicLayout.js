/* eslint-disable no-const-assign */
import React, { Suspense } from 'react';
import { Layout, Tabs, Dropdown, Menu, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { Route } from 'react-router-dom';
import router from 'umi/router';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import { formatMessage } from 'umi/locale';
import SiderMenu from '@/components/SiderMenu';
import PageLoading from '@/components/PageLoading';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';

import { title } from '../defaultSettings';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;
const { TabPane } = Tabs;

let UN_LISTTEN;
let routerArray = [];

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);

    routerArray = this.updateTree(props.route.routes);
    const homeRouter = routerArray.filter(itemroute => itemroute.key === '/')[0];

    this.state = {
      listenRouterState: [{ ...homeRouter, key: '/', tab: '首页', closable: false }],
      listenRouterKey: ['/'],
      activeKey: '/',
    };
  }

  componentDidMount() {
    const {
      dispatch,
      history,
      route: { routes, authority },
    } = this.props;

    let breadcrumbNameMap = [];

    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
      callback: value => {
        breadcrumbNameMap = value;
      },
    });

    UN_LISTTEN = history.listen(route => {
      const { listenRouterState, listenRouterKey } = this.state;
      const currentKey = route.pathname + this.parseQueryString(route.search);
      if (!listenRouterKey.includes(currentKey)) {
        let replaceRouter = routerArray.filter(itemroute => itemroute.key === route.pathname)[0];

        if (!replaceRouter) {
          replaceRouter = routerArray.filter(itemroute => itemroute.key === '/404')?.[0];

          this.setState({
            listenRouterState: [
              ...listenRouterState,
              { ...replaceRouter, key: currentKey, tab: '404' },
            ],
            activeKey: currentKey,
            listenRouterKey: [...listenRouterKey, currentKey],
          });
        } else {
          this.setState({
            listenRouterState: [
              ...listenRouterState,
              {
                ...replaceRouter,
                key: currentKey,
                tab:
                  this.getPageTitle(route.pathname, breadcrumbNameMap) +
                  this.getDetailPagePrimaryId(route),
              },
            ],
            activeKey: currentKey,
            listenRouterKey: [...listenRouterKey, currentKey],
          });
        }
      }

      this.setState({
        activeKey: currentKey,
      });
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-expressions
    UN_LISTTEN && UN_LISTTEN();
  }

  getDetailPagePrimaryId = route => {
    const detailPageIdEnum = ['id', 'title', 'activityNo'];
    let titleValue = '';

    Object.keys(route.query).forEach(item => {
      if (detailPageIdEnum.includes(item) && !titleValue) {
        titleValue = route.query[item];
      }
    });

    return titleValue ? ` - ${titleValue}` : '';
  };

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  parseQueryString = queryString => {
    if (!queryString) {
      return '';
    }

    if (queryString.indexOf('?') < 0) {
      return `?${queryString}`;
    }

    return queryString;
  };

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.forEach(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
      return title;
    }
    const pageName = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });

    return `${pageName}`;
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  updateTree = Tree => {
    const treeData = Tree;
    const treeList = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        if (node.routes && node.routes.length > 0) {
          getTreeList(node.routes);
        } else {
          treeList.push({
            tab: node.locale,
            key: node.path,
            locale: node.locale,
            closable: true,
            content: node.component,
            name: node.name,
          });
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  // 切换 tab页 router.push(key);
  onChange = key => {
    this.setState({
      activeKey: key,
    });
    router.push(key);
  };

  onHandlePage = e => {
    const { key } = e;
    router.push(key);
  };

  onClickHover = e => {
    // message.info(`Click on item ${key}`);
    const { key } = e;
    const { activeKey, listenRouterState, listenRouterKey, routeKey } = this.state;

    if (key === '1') {
      this.setState({
        activeKey: routeKey,
        listenRouterState: listenRouterState.filter(
          v => v.key !== activeKey || v.key === routeKey || !v.closable,
        ),
        listenRouterKey: listenRouterKey.filter(
          v => v !== activeKey || v === routeKey || !v.closable,
        ),
      });
    } else if (key === '2') {
      this.setState({
        activeKey,
        listenRouterState: listenRouterState.filter(
          v => v.key === activeKey || v.key === routeKey || !v.closable,
        ),
        listenRouterKey: listenRouterKey.filter(
          v => v === activeKey || v === routeKey || v === '/',
        ),
      });
    } else if (key === '3') {
      this.setState({
        activeKey: '/',
        listenRouterState: listenRouterState.filter(v => v.key === routeKey || !v.closable),
        listenRouterKey: listenRouterKey.filter(v => v === routeKey || v === '/'),
      });
    }
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    const { activeKey, listenRouterState } = this.state;

    let newActiviKey = activeKey;
    let lastIndex;

    listenRouterState.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tabList = [];
    const tabListKey = [];
    listenRouterState.forEach(pane => {
      if (pane.key !== targetKey) {
        tabList.push(pane);
        tabListKey.push(pane.key);
      }
    });
    if (lastIndex >= 0 && activeKey === targetKey) {
      newActiviKey = tabList[lastIndex].key;
    }
    router.push(newActiviKey);
    this.setState({
      listenRouterState: tabList,
      activeKey: newActiviKey,
      listenRouterKey: tabListKey,
    });
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;

    const { listenRouterState, activeKey } = this.state;

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const menu = (
      <Menu onClick={this.onClickHover}>
        <Menu.Item key="2">关闭其他标签页</Menu.Item>
        <Menu.Item key="3">关闭全部标签页</Menu.Item>
      </Menu>
    );
    const operations = (
      <div style={{ position: 'absolute', right: '100px', zIndex: 100 }}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link">
            关闭
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
            // onHandlePage={this.onHandlePage}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {/* <Authorized authority={routerConfig} noMatch={<Exception403 />}>
              {children}
              
            </Authorized> */}
            <div className={styles.contentBox}>
              <div className={styles.contentTabUrlBox}>
                <div className={styles.contentTabUrl}>
                  <Tabs
                    activeKey={activeKey}
                    onChange={this.onChange}
                    tabBarExtraContent={operations}
                    type="editable-card"
                    tabBarStyle={{ background: '#fff' }}
                    tabPosition="top"
                    tabBarGutter={-1}
                    onEdit={this.onEdit}
                    hideAdd
                  >
                    {listenRouterState.map(item => (
                      <TabPane tab={item.tab} key={item.key} closable={item.closable}>
                        <Route key={item.key} path={item.path} component={item.content} exact />
                        {/* {item.component()} */}
                      </TabPane>
                    ))}
                    {/* <Route component={() => (<></>)} /> */}
                  </Tabs>
                  <Footer />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
