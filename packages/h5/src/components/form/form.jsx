import React, { Children, cloneElement, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormController } from './form-controller';
import { useDummyUpdate } from '../../utils/use-dummy-update';

export function Form({ controller, name, mode, initialValues, onUpdate, onSubmit, children }) {
  const [ controller2 ] = useState(() => controller ?? new FormController({ name, mode, initialValues, onUpdate }));

  controller2.setUpdater(useDummyUpdate());

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
  onUpdate: null,
};
