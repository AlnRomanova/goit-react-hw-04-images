import React from 'react';
import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({closeModal, image}) => {
  const closeByEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };


  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);
  })

    return (
      <div className={css.overlay} onClick={handleBackdrop}>
        <div className={css.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
