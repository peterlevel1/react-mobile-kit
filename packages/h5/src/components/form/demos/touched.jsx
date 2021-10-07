import React, { useEffect, useState } from 'react'
import { Form, Button } from '@react-mobile-kit/h5';
import { DemoBlock } from 'demos';

export default () => {
  const [initialValues] = useState(() => ({
    name: '',
    age: '111'
  }))

  return (
    <>
      <DemoBlock title='表单初始化-touched'>
        <Form
          name='touchedForm'
          mode='touched'
          initialValues={initialValues}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          <Form.Item
            name='name'
            validate={(value) => {
              if (/帅哥/.test(value)) {
                return 'you should not let others know you are: 帅哥'
              }
            }}
          >
            <BasicInput placeholder='please write your name' />
          </Form.Item>
          <div style={{ height: 24 }} />
          <Form.Item
            name='age'
            onChange={(ev, setValue) => {
              if (ev.target.value === '') {
                setValue(ev.target.value);
                return;
              }

              const value = parseInt(ev.target.value);

              if (isNaN(value)) {
                return;
              }

              setValue(`${value}`);
            }}
            validate={(value) => {
              if (value == '') {
                return;
              }

              if (value < 1 || value > 100) {
                return '年龄不能为0, 也不能超过100岁';
              }
            }}
          >
            <BasicInput placeholder='please write your age' />
          </Form.Item>
          <div style={{ height: 24 }} />
          <BasicSubmit />
          <div style={{ height: 24 }} />
          <BasicReset />
        </Form>
      </DemoBlock>
    </>
  )
}

const BasicInput = ({ message, ...restProps }) => {
  const style = {};
  if (message) {
    style.borderColor = 'red';
  }

  return (
    <>
      <input {...restProps} style={style} />
      {message ? <p style={{ color: 'red' }}>{message}</p> : null}
    </>
  );
}

const BasicSubmit = ({ controller }) => {
  return (
    <Button
      block
      color='primary'
      type='submit'
      disabled={controller.hasError()}
    >
      提交
    </Button>
  );
}

const BasicReset = ({ controller }) => {
  return (
    <Button
      block
      onClick={() => {
        controller.resetValues();
      }}
    >
      重置表单的值
    </Button>
  );
}
