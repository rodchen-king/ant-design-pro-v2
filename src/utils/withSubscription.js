import React from 'react';

/**
 * model相关的处理函数
 */

/**
 * updateWrapperModel
 * @param {*} updateKey                 要更新的key
 * @param {*} updateValue               更新key对应的value
 * @param {*} primaryKey                当前页面对应的primaryKey
 * @param {*} currentPrimaryKeyState    primaryKey对应的数据源
 */
export function updateWrapperModel(updateKey, updateValue, primaryKey, currentPrimaryKeyState) {
  return {
    [primaryKey]: {
      ...currentPrimaryKeyState,
      [updateKey]: updateValue,
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
  const modelPrimaryKey = primaryKey;

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

        dispatch({
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
        const { match, location } = this.props;

        return location.query[modelPrimaryKey] || match.params[modelPrimaryKey];
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
