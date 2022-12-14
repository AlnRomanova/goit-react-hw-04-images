export const photosMapper = (arr) =>
   arr.map(({ id, webformatURL: image, largeImageURL: modalImage }) => ({
    id,
    image,
    modalImage,
  }));
