import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({onSubmitForm}) =>  {
 const [searchQuery, setSearchQuery] = useState('');


 const handleSearchChange = e => {
  setSearchQuery(e.currentTarget.value.toLowerCase());

 };

 const handleSearchSubmit = e => {
  e.preventDefault();
  if(searchQuery.trim() === '' ) {
  return toast.error("🤯 Please fill out this field!")
  }
  onSubmitForm(searchQuery);
  setSearchQuery('');
 };

  return (
    <>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSearchSubmit}>
          <button type="submit" className={css.formButton}>
            <span className={css.formLabel}>Search</span>
          </button>
          <input
            className={css.formInput}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
