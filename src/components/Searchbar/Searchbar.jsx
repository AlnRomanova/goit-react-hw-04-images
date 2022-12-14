import React, {Component} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {

 state = {
  searchQuery: '',
 }


 handleSearchChange = e => {
  this.setState({searchQuery: e.currentTarget.value.toLowerCase()});

 };

 handleSearchSubmit = e => {
  e.preventDefault();
  if(this.state.searchQuery.trim() === '' ) {
  return toast.error("🤯 Please fill out this field!")
  }
  this.props.onSubmitForm(this.state.searchQuery);
  this.setState({searchQuery: ''});
 };

render () {
  return (
    <>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSearchSubmit}>
          <button type="submit" className={css.formButton}>
            <span className={css.formLabel}>Search</span>
          </button>
          <input
            className={css.formInput}
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
