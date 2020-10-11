import React, { PureComponent } from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Home.less';

class HomePage extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <GridContent>
          <div className={styles.main}>
            <div className={styles.content}>
              <div className={styles.welcome}>
                <p className={styles.title}>欢迎登录</p>
                <p className={styles.subtitle}>Hello-Business</p>
              </div>
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}
export default HomePage;
