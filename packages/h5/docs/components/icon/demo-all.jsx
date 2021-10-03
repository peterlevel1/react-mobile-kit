import React from 'react';
import * as Icons from 'antd-mobile-icons';
import { Grid } from '@react-mobile-kit/h5';
import styles from './demo-all.less';

const items = []

for (let key in Icons) {
  const component = Icons[key];

  if (typeof component !== 'function') {
    continue;
  };

  items.push({
    name: key,
    component,
  });
}

export default () => {
  return (
    <div className={styles.container}>
      <Grid columns={4}>
        {items.map(item => (
          <Grid.Item key={item.name} className={styles.item}>
            <div className={styles.icon}>
              <item.component />
            </div>
            <div className={styles.label}>{item.name}</div>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  )
}
