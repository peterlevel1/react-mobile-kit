import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import LayerController from '../layer-controller';
import './index.less';

const prefix = 'rbk-Modal';

function Modal({ active, onClose }) {
  return (
    <LayerController active={active} onClose={onClose} clickable>
      <ModalElement />
    </LayerController>
  );
}

function ModalElement({ status }) {
  const cls = classNames(prefix, status);

  return (
    <div className={cls}>
    </div>
  )
}

export default Modal;
