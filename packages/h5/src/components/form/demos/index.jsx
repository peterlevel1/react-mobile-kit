import React from 'react'
import { Form, Button } from '@react-mobile-kit/h5';
import { DemoBlock } from 'demos';

export default () => {
  return (
    <>
      <DemoBlock title='基本'>
        <Form
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          <Form.Item name='name'>
            <input placeholder='please write something' />
          </Form.Item>
          <Button block type='submit'>
            提交
          </Button>
        </Form>
      </DemoBlock>
    </>
  )
}
