import { cloneElement, useState, useEffect } from "react";

export function FormItem({ controller, name, onChange, validate, children }) {
  const [ value, setValue ] = useState(controller.getInitialValue(name));
  const [ message, setMessage ] = useState('');

  if (!controller.getItem(name)) {
    controller.setItem(name, {
      setValue,
      setMessage,
      onChange,
      validate,
    });
  }

  // message and value
  useEffect(() => {
    controller.onValueChange(name, value);
  }, [value, controller, name]);

  return cloneElement(children, {
    message,
    value,
    onChange: controller.getItem(name).onChange
  });
}
