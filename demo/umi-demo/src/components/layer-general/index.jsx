import React, { cloneElement, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { STATUS, prefix } from './constants';
import { requestAnimationFrame, noop } from '../../utils';
import Mask from '../mask';
import './index.less';

function LayerGeneral({ remove, children, ...restProps }) {
  const { active, onClose, className, style, maskProps, enableAnimation, ...childrenProps } = restProps;
  const [ status, setStatus ] = useState(STATUS.DEFAULT);
  const [ mounted, setMounted ] = useState(false);

  // handle status at the end of the transition
  const lockStatus = useCallback((ev) => {
    if (ev?.stopPropagation) {
      ev.stopPropagation();
    }

    // enter(end) -> active
    if (active) {
      setStatus(STATUS.ACTIVE);
      return;
    }
    // leave(end) -> default
    setStatus(STATUS.DEFAULT);
  }, [active]);

  // identify the mounted for triggering transition
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
      // only handle the start point: default
      if (status === STATUS.DEFAULT) {
        // default -> active
        if (!enableAnimation) {
          setStatus(STATUS.ACTIVE);
          return;
        }
        // default -> enter
        setStatus(STATUS.ENTER);
      }
      return;
    }

    // active is false, set the right status
    if (status === STATUS.ACTIVE) {
      // active -> default
      if (!enableAnimation) {
        setStatus(STATUS.DEFAULT);
        return;
      }
      // active -> leave
      setStatus(STATUS.LEAVE);
      return;
    }

    // default -> destroy
    if (status === STATUS.DEFAULT) {
      setMounted(false);
      remove();
    }
  }, [active, status, enableAnimation, mounted]);

  const layerProps = {
    className: classNames(prefix, [className]),
    style,
  };

  const maskProps2 = {
    ...maskProps,
    onClose,
    status,
    lockStatus: enableAnimation ? lockStatus : noop,
  };

  return (
    <div {...layerProps}>
      <Mask {...maskProps2} />
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
  maskProps: PropTypes.object,
  enableAnimation: PropTypes.bool,
};

LayerGeneral.defaultProps = {
  onClose: () => {},
  active: false,
  className: '',
  style: null,
  onClick: null,
  maskProps: {
    closable: false,
    className: '',
  },
  enableAnimation: true,
};

export default LayerGeneral;
