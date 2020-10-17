import React from 'react';

/**
 * model相关的处理函数
 */

/**
 * updateWrapperModel
 * @param {*} updateStateObject         要更新state的健值对
 * @param {*} primaryKey                当前页面对应的primaryKey
 * @param {*} currentPrimaryKeyState    primaryKey对应的数据源
 */
export function updateWrapperModel(updateStateObject, primaryKey, currentPrimaryKeyState) {
  return {
    [primaryKey]: {
      ...currentPrimaryKeyState,
      ...updateStateObject,
    },
  };
}

/**
 * 高阶函数
 * @param {*} namespace
 * @param {*} primaryKey
 */
function wrapperWithSubscription(namespace, primaryKey) {
  // eslint-disable-next-line no-use-before-define
  const modelNameSpace = namespace;
  let modelPrimaryKey = primaryKey;

  return function withSubscription(WrappedComponent) {
    // ...并返回另一个组件...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          primaryKeyValue: this.getPrimaryKeyValue(),
          initData: {},
        };
      }

      componentWillMount() {
        const { dispatch } = this.props;
        const { primaryKeyValue } = this.state;

        dispatch({
          type: `${modelNameSpace}/initData`,
          payload: {
            primaryKey: primaryKeyValue,
          },
        });

        return dispatch({
          type: `${modelNameSpace}/getExample`,
          payload: {},
          callback: result => {
            this.setState({
              initData: result,
            });
          },
        });
      }

      componentWillUnmount() {
        // 可以自定扩展如何消除当前primarykey对应的数据
        // 一般情况下，前端业务组件会自己清除state的数据
      }

      // for query and match
      getPrimaryKeyValue = () => {
        if (!Array.isArray(modelPrimaryKey)) modelPrimaryKey = [modelPrimaryKey];

        return this.parseArrayPrimaryKeyValue(modelPrimaryKey);
      };

      // 如果传入进来的是一个数组
      parseArrayPrimaryKeyValue = keyArray => {
        const { match, location } = this.props;
        let primaryValue = '';

        keyArray.forEach(item => {
          primaryValue += location.query[item] ? location.query[item] : '';
          primaryValue += match.params[item] ? match[item] : '';
        });

        return primaryValue;
      };

      wrapperDispatch = dispatchPrams => {
        const { dispatch } = this.props;
        const { primaryKeyValue } = this.state;

        dispatch({
          ...dispatchPrams,
          primaryKey: primaryKeyValue,
        });
      };

      render() {
        const { initData, primaryKeyValue } = this.state;

        const modelNameSpaceProps = {
          // eslint-disable-next-line react/destructuring-assignment
          [modelNameSpace]: this.props[modelNameSpace][primaryKeyValue] || initData,
        };

        return (
          <WrappedComponent
            {...this.props}
            dispatch={this.wrapperDispatch}
            {...modelNameSpaceProps}
          />
        );
      }
    };
  };
}

export default wrapperWithSubscription;
