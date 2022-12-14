import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { photosMapper } from '../helpers/photosMapper';
import { fetchPhotos } from 'services/searchAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { useEffect } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getPhotos() {
      try {
        const response = await fetchPhotos(searchQuery, page);
        setPhotos(prevState => [
          ...prevState,
          ...photosMapper(response.data.hits),
        ]);
        if (!response.data.hits.length) {
          return Promise.reject(
            new Error(
              toast.info(
                '😲 Sorry, there are no images matching your search query.'
              )
            )
          );
        } else if (page === 1) {
          toast.success(`Hooray! We found images.`, {
            icon: '🚀',
          });
        }
      } catch (error) {
        setPhotos(error);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    getPhotos();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPhotos([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = data => {
    setLargeImage(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImage(null);
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmitForm={handleFormSubmit} />
      <ImageGallery photos={photos} openModal={openModal} />
      {showModal && <Modal image={largeImage} closeModal={closeModal} />}
      {isLoading && <Loader />}
      {photos.length > 0 && <Button handleClick={loadMore} />}
      <ToastContainer autoClose={2000} />
    </>
  );
};
