import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button } from 'antd';

class ListDetail extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;

    console.log(location.query.name);
  }

  render() {
    const { history, location } = this.props;
    return (
      <PageHeaderWrapper page="详情">
        <div>{location.query.title}</div>
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
