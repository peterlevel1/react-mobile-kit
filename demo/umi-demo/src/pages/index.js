import React, { useCallback, useState } from 'react';
import Modal from '../components/modal';
import styles from './index.css';

export default function() {
  const [ modalActive, setModalActive ] = useState(false);

  const showModal = useCallback(() => {
    console.log('indexPage#showModal');
    setModalActive(true);
  }, []);

  const hideModal = useCallback(() => {
    console.log('indexPage#hideModal');
    setModalActive(false);
  }, []);

  console.log('indexPage - modalActive', modalActive);

  return (
    <div className={styles.container}>
      <button onClick={showModal}>show modal</button>
      <Modal active={modalActive} onClose={hideModal} />
    </div>
  );
}
