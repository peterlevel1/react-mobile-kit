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
            name: 'peter',
            age: '16'
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
              if (/松哥/.test(value)) {
                return 'you should not expose your name: 松哥'
              }
            }}
          >
            <BasicInput placeholder='please write your name' />
          </Form.Item>
          <div style={{ height: 24 }} />
          <Form.Item
            name='age'
            onChange={(ev, setValue) => {
              if (/(0?\.)?\d+$/.test(ev.target.value)) {
                setValue(ev.target.value);
              }
            }}
          >
            <input placeholder='please write your age' />
          </Form.Item>
          <div style={{ height: 24 }} />
          <BasicSubmit />
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
