import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import Layer from '../layer';
import './index.less';

const prefix = 'rbk-Modal';

function Modal({ active, onClose }) {
  return (
    <Layer active={active} onClose={onClose} maskProps={{ theme: 'dark', closable: true }}>
      <ModalElement />
    </Layer>
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
