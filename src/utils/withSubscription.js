import React from 'react';
import WrapperStatistic from 'antd/lib/statistic/Statistic';

let modelNameSpace;

function withSubscription(WrappedComponent) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentProps: Object.assign({}, this.props.location),
      };
    }

    componentDidMount() {
      console.log(modelNameSpace);
    }

    componentWillUnmount() {}

    // shouldComponentUpdate(nextProps) {
    //   if (this.parseHref(nextProps.location) === this.parseHref(this.props.location)) {
    //     return true;
    //   }

    //   return false;
    // }

    parseHref = location => {
      return location.pathname + location.search;
    };

    wrapperDispatch = ({ payload, ...restParams }) => {
      const {
        dispatch,
        location: { query },
      } = this.props;
      const currentStaet = this.props[modelNameSpace].dataGroup;

      dispatch({
        ...restParams,
        payload: { dataGroup: { ...currentStaet, [query.title]: payload } },
      });
    };

    render() {
      const { query } = this.state.currentProps;

      const modelNameSpaceProps = {
        [modelNameSpace]: this.props[modelNameSpace]['dataGroup'][query.title] || {},
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
