import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';


const ImageGallery = ({photos, openModal}) => {
  return (
    <ul className={css.gallery}>
    <ImageGalleryItem  photos={photos} openModal={openModal}/>
    </ul>

  )
}

export default ImageGallery;

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  openModal: PropTypes.func.isRequired,
}
