import { Form } from './form';
import { FormController } from './form-controller';
import { FormItem } from './form-item';

Object.assign(Form, {
  Item: FormItem,
  Controller: FormController,
});

export default Form;
