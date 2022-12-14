import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  render() {
    const { image } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleBackdrop}>
        <div className={css.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
