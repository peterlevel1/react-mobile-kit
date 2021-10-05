import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LAYER_STATUS } from './constants';

const prefixMask = 'rmk-LayerMask';

export function LayerMask({ theme, className, status, closable, onClose, ...restProps }) {
  const onClick = useCallback((ev) => {
    ev.stopPropagation();

    if (status === LAYER_STATUS.ENTER || status === LAYER_STATUS.LEAVE) {
      return;
    }

    if (!closable) {
      return;
    }

    onClose();
  }, [closable, status]);

  const props = {
    ...restProps,
    className: classNames(prefixMask, [className, theme, status]),
    onClick,
  };

  return <div {...props} />;
}

LayerMask.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  className: PropTypes.string,
  closable: PropTypes.bool,
  status: PropTypes.string,
  onClose: PropTypes.func,
};

LayerMask.defaultProps = {
  theme: 'dark',
  className: '',
  status: '',
  closable: false,
  onClose: () => {},
};
