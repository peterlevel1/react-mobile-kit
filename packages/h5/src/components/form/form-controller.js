import { requestAnimationFrame } from '../../utils/animation-frame';

const controllerOptions = {
  messageAfterValueInited: false,
  valueInitedManually: false
};

// TODO: messageManually, 手动设置message
export class FormController {
  constructor(options = controllerOptions) {
    this.options = options;
    this.itemMap = {};
    this.values = {};
    this.initialValues = null;
  }

  setOption(name, value) {
    this.options[name] = value;
  }

  resetValues() {
    Object.keys(this.itemMap).forEach(name => {
      const item = this.getItem(name);
      item.valueInited = false;
      item.setValue(this.getInitialValue(name));
    });
  }

  setUpdater(cb) {
    this.updater = cb;
  }

  setUpdateCb(updateCb) {
    this.updateCb = updateCb;
  }

  isValuesInited() {
    return Object.keys(this.itemMap).every(name => this.getItem(name).valueInited);
  }

  setAllValuesInited() {
    Object.keys(this.itemMap).forEach(name => {
      this.getItem(name).valueInited = true;
    });
  }

  // item: { name, setValue, setMessage, validate, onChange }
  setItem(name, { setValue, setMessage, onChange, validate }) {
    const controller = this;

    this.itemMap[name] = {
      name,
      valueInited: false,
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
        this.message = validate(val, preValue, this, controller) || '';
        if (!controller.options.messageAfterValueInited || this.valueInited) {
          requestAnimationFrame(() => {
            this.setMessage(this.message);
          });
        }
        return this.message;
      },
    };
  }

  hasError() {
    return Object.keys(this.itemMap).some(name => !!this.getItem(name).message);
  }

  onValueChanged(name, value) {
    const item = this.getItem(name);
    item.validate(value);
    this.setValue(name, value);
    if (!this.options.valueInitedManually) {
      item.valueInited = true;
    }
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
      const ret = this.updateCb(name, value, prevVal, this.getItem(name));
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
