import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({handleClick}) => {
  return (
    <button className={css.btn} type="button" onClick={handleClick}>Load more</button>
  )
}
export default Button;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
