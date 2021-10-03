 import React from 'react'
import { ErrorBlock, Space } from '@react-mobile-kit/h5'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='四种状态'>
        <Space block direction='vertical' size={16}>
          <ErrorBlock status='default' />
          <ErrorBlock status='disconnected' />
          <ErrorBlock status='empty' />
          <ErrorBlock status='busy' />
        </Space>
      </DemoBlock>
    </>
  )
}
