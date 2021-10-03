import React from 'react'
import { DemoBlock } from 'demos'
import { ConfigProvider, ErrorBlock } from '@react-mobile-kit/h5'
import zhCN from '@react-mobile-kit/h5/es/locales/zh-CN'
import enUS from '@react-mobile-kit/h5/es/locales/en-US'

export default () => {
  return (
    <>
      <DemoBlock title='中文'>
        <ConfigProvider locale={zhCN}>
          <ErrorBlock />
        </ConfigProvider>
      </DemoBlock>
      <DemoBlock title='英文'>
        <ConfigProvider locale={enUS}>
          <ErrorBlock />
        </ConfigProvider>
      </DemoBlock>
    </>
  )
}
