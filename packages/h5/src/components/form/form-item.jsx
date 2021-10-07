import { cloneElement, useState, useEffect } from "react";

export function FormItem({ controller, name, onChange, validate, children }) {
  const [ value, setValue ] = useState();
  const [ message, setMessage ] = useState();

  if (!controller.getItem(name)) {
    controller.setItem(name, {
      setValue,
      setMessage,
      onChange,
      validate,
    });
  }

  // initial value
  useEffect(() => {
    const initialValue = controller.getInitialValue(name);
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, []);

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
