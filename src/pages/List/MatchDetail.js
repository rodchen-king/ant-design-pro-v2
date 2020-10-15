import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import withSubscription from '@/utils/withSubscription';
import withRouterMatth from '@/utils/withRouterMatch';
import { connect } from 'dva';
import { Button } from 'antd';

@connect(({ detail, loading, globalAuthority }) => ({
  detail,
  globalAuthority,
  loading: loading.models.rule,
}))
@withRouterMatth()
@withSubscription('detail', 'title')
class ListDetail extends React.PureComponent {
  componentDidMount() {
    const { match, dispatch } = this.props;
    dispatch({
      type: 'detail/fetch',
      payload: {
        name: match.params.title,
      },
    });
  }

  render() {
    const { history, detail } = this.props;
    return (
      <PageHeaderWrapper page="match详情">
        <div>{detail.data.name}</div>
        <div>
          <input />
        </div>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          返回
        </Button>
      </PageHeaderWrapper>
    );
  }
}

export default ListDetail;
