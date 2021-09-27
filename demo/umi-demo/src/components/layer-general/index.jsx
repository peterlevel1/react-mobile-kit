import React, { cloneElement, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { requestAnimationFrame, noop } from '../../utils';
import { LAYER_STATUS } from '../../utils/constants';
import Mask from '../mask';
import './index.less';

const prefix = 'rbk-LayerGeneral';

function LayerGeneral({ remove, children, ...restProps }) {
  const { active, onClose, className, style, maskProps, enableAnimation, ...childrenProps } = restProps;
  const [ status, setStatus ] = useState(LAYER_STATUS.DEFAULT);
  const [ mounted, setMounted ] = useState(false);

  // handle status at the end of the transition
  const lockStatus = useCallback((ev) => {
    if (ev?.stopPropagation) {
      ev.stopPropagation();
    }

    // enter(end) -> active
    if (active) {
      setStatus(LAYER_STATUS.ACTIVE);
      return;
    }
    // leave(end) -> default
    setStatus(LAYER_STATUS.DEFAULT);
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
      if (status === LAYER_STATUS.DEFAULT) {
        // default -> active
        if (!enableAnimation) {
          setStatus(LAYER_STATUS.ACTIVE);
          return;
        }
        // default -> enter
        setStatus(LAYER_STATUS.ENTER);
      }
      return;
    }

    // active is false, set the right status
    if (status === LAYER_STATUS.ACTIVE) {
      // active -> default
      if (!enableAnimation) {
        setStatus(LAYER_STATUS.DEFAULT);
        return;
      }
      // active -> leave
      setStatus(LAYER_STATUS.LEAVE);
      return;
    }

    // default -> destroy
    if (status === LAYER_STATUS.DEFAULT) {
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
    onTransitionEnd: enableAnimation ? lockStatus : noop,
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
