import React from 'react';

let modelNameSpace;

function withSubscription(WrappedComponent) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentProps: Object.assign({}, props.location),
        initData: {}
      };
    }

    componentWillMount() {
      const { dispatch, location } = this.props;

      dispatch({
        type: `${modelNameSpace}/initData`,
        payload: location.query.title
      })

      dispatch({
        type: `${modelNameSpace}/getExample`,
        payload: {},
        callback: (result) => {
          this.setState({
            initData: result
          })
        }
      })
    }

    componentWillUnmount() {}

    parseHref = location => location.pathname + location.search;

    wrapperDispatch = ({ payload, ...restParams }) => {
      const {
        dispatch,
        location: { query },
      } = this.props;
      
      // eslint-disable-next-line react/destructuring-assignment
      const currentStaet = this.props[modelNameSpace].dataGroup;

      dispatch({
        ...restParams,
        payload: { dataGroup: { ...currentStaet, [query.title]: payload } },
      });
    };

    render() {
      const { initData, currentProps: { query } } = this.state;

      const modelNameSpaceProps = {
        // eslint-disable-next-line react/destructuring-assignment
        [modelNameSpace]: this.props[modelNameSpace].dataGroup[query.title] || initData,
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
}

// 此函数接收一个组件...
function wrapperWithSubscription(namespace) {
  // eslint-disable-next-line no-use-before-define
  modelNameSpace = namespace;
  return withSubscription;
}

export default wrapperWithSubscription;
