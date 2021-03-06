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
@withSubscription('detail', 'title')
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
    const { history, detail, location } = this.props;
    return (
      <PageHeaderWrapper page="新增页面">
        <div>{location.query.id}</div>
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
        <Button
          onClick={() => {
            history.push('/List/table-create?id=001');
          }}
        >
          调到下一步骤
        </Button>
      </PageHeaderWrapper>
    );
  }
}

export default ListDetail;
