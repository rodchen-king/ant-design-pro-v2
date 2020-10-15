import React from 'react';
import { RouterContext } from '@/layouts/BasicLayout';

/**
 * 高阶函数: 适配match
 */
function withRouterMath() {
  // eslint-disable-next-line no-use-before-define

  return function withSubscription(WrappedComponent) {
    // ...并返回另一个组件...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          currentLocation: Object.assign({}, props.location),
        };
      }

      getMatch = value => {
        const {
          currentLocation: { pathname },
        } = this.state;

        const returnValue = value.filter(item => item.key === pathname);

        if (returnValue.length) {
          return returnValue[0].match;
        }

        return {};
      };

      render() {
        return (
          <RouterContext.Consumer>
            {_value => <WrappedComponent {...this.props} match={this.getMatch(_value)} />}
          </RouterContext.Consumer>
        );
      }
    };
  };
}

export default withRouterMath;
