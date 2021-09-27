import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

const prefixMask = 'rbk-Mask';

function Mask({ theme, className, status, closable, onClose, ...restProps }) {
  const onClick = useCallback((ev) => {
    ev.stopPropagation();

    if (!closable) {
      return;
    }

    onClose();
  }, [closable]);

  const props = {
    ...restProps,
    className: classNames(prefixMask, [className, theme, status]),
    onClick,
  };

  return <div {...props} />;
}

Mask.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  className: PropTypes.string,
  closable: PropTypes.bool,
  status: PropTypes.string,
  onClose: PropTypes.func,
};

Mask.defaultProps = {
  theme: 'dark',
  className: '',
  status: '',
  closable: false,
  onClose: () => {},
};

export default Mask;
