import React from 'react'
import { DemoBlock } from 'demos'
import { Button, setDefaultConfig, Space } from '@react-mobile-kit/h5'
import enUS from '@react-mobile-kit/h5/es/locales/en-US'
import zhCN from '../../../locales/zh-CN'

export default () => {
  function toChinese() {
    setDefaultConfig({
      locale: zhCN,
    });
    alert('已切换到中文');
  }
  function toEnglish() {
    setDefaultConfig({
      locale: enUS,
    });
    alert('Switched to English');
  }
  return (
    <DemoBlock title='设置全局默认值'>
      <Space>
        <Button onClick={toChinese}>切换到中文</Button>
        <Button onClick={toEnglish}>Switch to English</Button>
      </Space>
    </DemoBlock>
  )
}
