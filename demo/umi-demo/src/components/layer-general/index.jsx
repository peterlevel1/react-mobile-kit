import React, { cloneElement, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { requestAnimationFrame } from '../../utils/animation-frame';
import './index.less';

const prefix = 'rbk-LayerGeneral';
const STATUS = {
  DEFAULT: '',
  ENTER: 'enter',
  ACTIVE: 'active',
  LEAVE: 'leave',
};

function LayerGeneral({ remove, children, ...restProps }) {
  const { active, onClose, className, style, onClick, clickable, maskClassName, enableAnimation, ...childrenProps } = restProps;
  const [ status, setStatus ] = useState(STATUS.DEFAULT);
  const [ mounted, setMounted ] = useState(false);

  const onClickLayer = useCallback((ev) => {
    ev.stopPropagation();

    if (!clickable) {
      return;
    }

    if (onClick) {
      onClick(ev);
      return;
    }

    onClose();
  }, [clickable]);

  const onTransitionEnd = useCallback((ev) => {
    ev.stopPropagation();
    // enter(end) -> active
    if (active) {
      setStatus(STATUS.ACTIVE);
      return;
    }
    // leave(end) -> default
    setStatus(STATUS.DEFAULT);
  }, [active]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (active) {
      if (status === STATUS.DEFAULT) {
        if (!enableAnimation) {
          setStatus(STATUS.ACTIVE);
          return;
        }
        setStatus(STATUS.ENTER);
      }
      return;
    }

    if (status === STATUS.ACTIVE) {
      if (!enableAnimation) {
        setStatus(STATUS.DEFAULT);
        return;
      }
      setStatus(STATUS.LEAVE);
      return;
    }

    if (status === STATUS.DEFAULT) {
      setMounted(false);
      remove();
    }
  }, [active, status, enableAnimation, mounted]);

  const layerProps = {
    className: classNames(prefix, [className]),
    style,
    onClick: onClickLayer
  };

  const maskProps = {
    className: classNames(`${prefix}-mask`, [maskClassName, status]),
    onTransitionEnd: null,
  };

  if (enableAnimation) {
    maskProps.onTransitionEnd = onTransitionEnd;
  }

  return (
    <div {...layerProps}>
      <div {...maskProps} />
      {cloneElement(children, { ...childrenProps, status })}
    </div>
  );
}

LayerGeneral.propTypes = {
  onClose: PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  maskClassName: PropTypes.string,
  enableAnimation: PropTypes.bool,
};

LayerGeneral.defaultProps = {
  onClose: () => null,
  active: false,
  className: '',
  style: null,
  onClick: null,
  clickable: false,
  maskClassName: '',
  enableAnimation: true,
};

export default LayerGeneral;
