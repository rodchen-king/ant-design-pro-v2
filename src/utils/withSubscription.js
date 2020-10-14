import React from 'react';

/**
 * model相关的处理函数
 */

/**
 * updateWrapperModel
 * @param {*} updateKey
 * @param {*} updateValue
 * @param {*} primaryKey
 * @param {*} currentPrimaryKeyState
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
          currentProps: Object.assign({}, props.location),
          initData: {},
        };
      }

      componentWillMount() {
        const { dispatch, location } = this.props;

        dispatch({
          type: `${modelNameSpace}/initData`,
          payload: {
            primaryKey: location.query.title,
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

      componentWillUnmount() {}

      parseHref = location => location.pathname + location.search;

      wrapperDispatch = ({ payload, ...restParams }) => {
        const {
          dispatch,
          location: { query },
        } = this.props;

        dispatch({
          ...restParams,
          payload: {
            params: payload,
            primaryKey: query[modelPrimaryKey],
          },
        });
      };

      render() {
        const {
          initData,
          currentProps: { query },
        } = this.state;

        const modelNameSpaceProps = {
          // eslint-disable-next-line react/destructuring-assignment
          [modelNameSpace]: this.props[modelNameSpace][query[modelPrimaryKey]] || initData,
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
