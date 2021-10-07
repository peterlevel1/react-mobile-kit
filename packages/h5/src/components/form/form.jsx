import React, { Children, cloneElement, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormController } from './form-controller';
import { noop } from '../../utils/noop';

export function Form({ controller, onUpdate, initialValues, onSubmit, children }) {
  const [ controller2 ] = useState(() => controller ?? new FormController());
  const [ , setN ] = useState(0);
  const update = useCallback(() => setN((n) => n + 1), []);

  controller2.setUpdater(update);

  if (initialValues) {
    controller2.setInitialValues(initialValues);
  }

  if (onUpdate) {
    controller2.setUpdateCb(onUpdate);
  }

  const onSubmit2 = useCallback((ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    const resValidate = controller2.validate();
    if (resValidate.message) {
      return;
    }
    onSubmit(resValidate.values);
  }, [controller2]);

  return (
    <form onSubmit={onSubmit2}>
      {
        Children.map(children, (child) => {
          return cloneElement(child, {
            controller: controller2,
          })
        })
      }
    </form>
  )
}

Form.propTypes = {
  controller: PropTypes.instanceOf(FormController),
  initialValues: PropTypes.object,
  onUpdate: PropTypes.func,
};

Form.defaultProps = {
  controller: null,
  initialValues: null,
  onUpdate: noop,
};
