import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { photosMapper } from '../helpers/photosMapper';
import { fetchPhotos } from 'services/searchAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    photos: [],
    page: 1,
    isLoading: false,
    largeImage: null,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ isLoading: true, photos: []  });
    }
    if (prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page) {
      this.setState({ isLoading: true});
      this.getPhotos();
    }
  }

  async getPhotos() {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetchPhotos(searchQuery, page);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photosMapper(response.data.hits)],
      }));
      if (!response.data.hits.length) {
        return Promise.reject(
          new Error(
            toast.info(
              '😲 Sorry, there are no images matching your search query.'
            )
          )
        );
      } else if ( page=== 1) {
        toast.success(`Hooray! We found images.`, {
          icon: '🚀',
        });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.setState({page: 1})
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = data => {
    this.setState({ largeImage: data, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImage: null, showModal: false });
  };

  render() {
    const { photos, isLoading, showModal, largeImage } = this.state;

    return (
      <>
        <Searchbar onSubmitForm={this.handleFormSubmit} />
        <ImageGallery photos={photos} openModal={this.openModal} />
        {showModal && <Modal image={largeImage} closeModal={this.closeModal} />}
        {isLoading && <Loader />}
        {photos.length > 0 && <Button handleClick={this.loadMore} />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
