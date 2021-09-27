import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix } from './constants';
import './mask.less';

const prefixMask = `${prefix}-Mask`;

function Mask({ className, status, lockStatus, closable, onClose, ...restProps }) {
  const onClick = useCallback((ev) => {
    ev.stopPropagation();

    if (!closable) {
      return;
    }

    onClose();
  }, [closable]);

  const props = {
    ...restProps,
    className: classNames(prefixMask, [className, status]),
    onClick,
    onTransitionEnd: lockStatus,
  };

  return <div {...props} />;
}

Mask.propTypes = {
  className: PropTypes.string,
  closable: PropTypes.bool,
  status: PropTypes.string,
  lockStatus: PropTypes.func,
  onClose: PropTypes.func,
};

Mask.defaultProps = {
  className: '',
  status: '',
  closable: false,
  lockStatus: () => {},
  onClose: () => {},
};

export default Mask;
