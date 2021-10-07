import { requestAnimationFrame } from '../../utils/animation-frame';

export class FormController {
  constructor() {
    this.itemMap = {};
    this.values = {};
    this.initialValues = null;
  }

  resetValues() {
    Object.keys(this.itemMap).forEach(name => this.getItem(name).setValue(this.getInitialValue(name)));
  }

  setUpdater(cb) {
    this.updater = cb;
  }

  setUpdateCb(updateCb) {
    this.updateCb = updateCb;
  }

  // item: { name, setValue, setMessage, validate, onChange }
  setItem(name, { setValue, setMessage, onChange, validate }) {
    const controller = this;

    this.itemMap[name] = {
      name,
      setValue,
      setMessage,
      onChange(ev, targetKey = 'value') {
        if (!onChange) {
          if (ev?.target && ev.target[targetKey] != null) {
            setValue(ev.target[targetKey]);
            return;
          }
          setValue(ev);
          return;
        }

        onChange(ev, setValue);
      },
      validate(val) {
        if (!validate) {
          return;
        }
        const preValue = controller.getValue(this.name);
        const message = validate(val, preValue, this, controller) || '';
        requestAnimationFrame(() => {
          this.setMessage(this.message = message);
        });
        return message;
      },
    };
  }

  onValueChange(name, value) {
    const item = this.getItem(name);
    item.validate(value);
    this.setValue(name, value);
  }

  getItem(name) {
    return this.itemMap[name];
  }

  getInitialValue(name) {
    if (this.initialValues) {
      return this.initialValues[name];
    }
  }

  setInitialValues(initialValues) {
    if (!this.initialValues) {
      this.initialValues = initialValues;
    }
  }

  setValue(name, value) {
    const prevVal = this.values[name];
    this.values[name] = value;

    if (this.updateCb) {
      const ret = this.updateCb(name, value, prevVal);
      if (ret === true && this.updater) {
        this.updater();
      }
    }
  }

  getValue(name) {
    return this.values[name];
  }

  validate() {
    const names = Object.keys(this.itemMap);
    const messages = [];
    const values = {};

    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      const item = this.getItem(name);
      const value = this.getValue(name);
      const message = item.validate(value);

      if (message) {
        messages.push({ name, message });
      }

      if (!messages.length) {
        values[name] = value;
      }
    }

    return {
      message: !messages.length ? null : messages,
      values: messages.length > 0 ? null : values
    };
  }
}
