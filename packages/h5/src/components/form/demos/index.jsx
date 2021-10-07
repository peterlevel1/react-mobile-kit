import React from 'react'
import { Form, Button } from '@react-mobile-kit/h5';
import { DemoBlock } from 'demos';

export default () => {
  const [controller] = React.useState(() => new Form.Controller());

  return (
    <>
      <DemoBlock title='基本'>
        <Form
          controller={controller}
          initialValues={{
            name: '',
            age: ''
          }}
          onUpdate={(name, value, preValue) => {
            console.log('update form: ', name, value, preValue);
            return true;
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          <Form.Item
            name='name'
            validate={(value) => {
              if (/葱哥/.test(value)) {
                return 'you should not let others know you are: 葱哥'
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

              setValue(value);
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
  const retValidate = controller.validate();
  console.log('retValidate', retValidate);

  return (
    <Button
      block
      type='submit'
      disabled={!!retValidate.message}
    >
      提交
    </Button>
  );
}

const BasicReset = ({ controller }) => {
  return (
    <Button
      block
      color='primary'
      onClick={() => {
        controller.resetValues();
      }}
    >
      重置表单的值
    </Button>
  );
}
