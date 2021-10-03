import React from 'react'
import { Button, ErrorBlock } from '@react-mobile-kit/h5';
import { DemoBlock } from 'demos'

export default () => {
  return (
    <DemoBlock title='自定义'>
      <ErrorBlock
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        description={
          <span>
            Customize <a href='#API'>Description</a>
          </span>
        }
      >
        <Button color='primary'>Create Now</Button>
      </ErrorBlock>
    </DemoBlock>
  )
}
