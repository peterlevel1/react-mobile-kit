import { requestAnimationFrame } from '../../utils/animation-frame';

const controllerOptions = {
  // 表单名称
  name: '',
  // '' | touched
  // touched 模式: 初始设置的值，不予验证
  mode: '',
  // valueInited 为 true 时，设置 message
  messageAfterValueInited: false,
  // 手动设置 valueInited
  valueInitedManually: false,
  // 手动设置 message
  messageManually: false,
  // 初始化的值
  initialValues: null,
  // 当字段变动时
  onUpdate: null,
};

function handleTouchedModeUpdate(name, value) {
  const item = this.getItem(name);

  if (!item.valueInited) {
    if (value !== this.getInitialValue(name)) {
      if (item.message) {
        item.setMessage(item.message);
      }
      item.valueInited = true;
    } else {
      item.setMessage('');
    }
  }

  return this.isValuesInited();
}

export class FormController {
  constructor(options = controllerOptions) {
    this.options = options;
    this.itemMap = {};
    this.values = {};
    this.initialValues = null;
    this.updateCbs = [];

    this.init();
  }

  init() {
    if (this.options.name) {
      this.name = this.options.name;
    }

    if (this.options.mode === 'touched') {
      this.setOption('messageAfterValueInited', true);
      this.setOption('valueInitedManually', true);
      this.addUpdateCb(handleTouchedModeUpdate);
    }

    if (this.options.onUpdate) {
      this.addUpdateCb(this.options.onUpdate);
    }

    if (this.options.initialValues) {
      this.setInitialValues(this.options.initialValues);
    }
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

  addUpdateCb(updateCb) {
    if (!this.updateCbs.includes(updateCb)) {
      this.updateCbs.push(updateCb);
    }
  }

  isValuesInited() {
    return Object.keys(this.itemMap).every(name => this.getItem(name).valueInited);
  }

  setAllValuesInited(bool = true) {
    Object.keys(this.itemMap).forEach(name => {
      this.getItem(name).valueInited = !!bool;
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
            if (!controller.options.messageManually) {
              this.setMessage(this.message);
            }
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

    if (this.updateCbs.length > 0) {
      const ret = this.updateCbs.reduce((memo, cb) => (!memo ? false : !!cb.call(this, name, value, prevVal, this.getItem(name), this)), true);
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
