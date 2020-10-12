import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import withSubscription from '@/utils/withSubscription';
import { connect } from 'dva';
import { Button } from 'antd';

@connect(({ detail, loading, globalAuthority }) => ({
  detail,
  globalAuthority,
  loading: loading.models.rule,
}))
@withSubscription('detail')
class ListDetail extends React.PureComponent {
  componentDidMount() {
    const { location, dispatch } = this.props;

    dispatch({
      type: 'detail/fetch',
      payload: {
        name: location.query.title,
      },
    });

    console.log(location.query.name);
  }

  render() {
    const { history, location, detail } = this.props;
    return (
      <PageHeaderWrapper page="详情">
        <div>{detail.name}</div>
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
