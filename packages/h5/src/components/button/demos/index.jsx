import React from 'react'
import { Button, Space } from '@react-mobile-kit/h5'
import { DemoBlock } from 'demos'
import { SearchOutline } from 'antd-mobile-icons'

export default () => {
  return (
    <>
      <DemoBlock title='不同颜色的按钮'>
        <Space wrap>
          <Button
            onClick={() => {
              alert('hello.')
            }}
          >
            Default
          </Button>
          <Button color='primary'>Primary</Button>
          <Button color='success'>Success</Button>
          <Button color='danger'>Danger</Button>
          <Button color='warning'>Warning</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='块级按钮'>
        <Button block color='primary' size='large'>
          Block Button
        </Button>
      </DemoBlock>
      <DemoBlock title='填充模式'>
        <Space wrap>
          <Button color='primary' fill='solid'>
            Solid
          </Button>
          <Button color='primary' fill='outline'>
            Outline
          </Button>
          <Button color='primary' fill='none'>
            None
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='不同大小的按钮'>
        <Space wrap align='center'>
          <Button size='mini' color='primary'>
            Mini
          </Button>
          <Button size='small' color='primary'>
            Small
          </Button>
          <Button size='middle' color='primary'>
            Middle
          </Button>
          <Button size='large' color='primary'>
            Large
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='禁用状态'>
        <Space wrap>
          <Button disabled>Disabled</Button>
          <Button disabled color='primary'>
            Disabled
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='加载状态'>
        <Space wrap>
          <Button loading color='primary' loadingText='加载中'>
            Loading
          </Button>
          <Button loading>Loading</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='带图标的按钮'>
        <Button>
          <Space>
            <SearchOutline />
            <span>搜索</span>
          </Space>
        </Button>
      </DemoBlock>
    </>
  )
}
