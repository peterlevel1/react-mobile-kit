import React from 'react';
import styles from './index.less';

export const DemoDescription = props => {
  return (
    <div className={styles.demoDescription}>
      {props.content || props.children}
    </div>
  )
}
