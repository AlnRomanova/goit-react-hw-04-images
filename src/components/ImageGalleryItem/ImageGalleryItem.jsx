import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ photos, openModal }) => {
  return (
    <>
      {photos.map(({ id, image, modalImage }) => (
        <li className={css.galleryItem} key={id}>
          <img
            className={css.galleryImage}
            src={image}
            alt=""
            onClick={() => openModal(modalImage)}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      modalImage: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openModal: PropTypes.func,
};
