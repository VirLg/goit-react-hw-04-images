import { useState, useEffect } from 'react';
import ModalWindow from '../ModalWindow/ModalWindov';
import { ImageGalleryItem } from './ImageItem.styled';
//* Hooks

const ImageItem = props => {
  const { card } = props;

  // useState
  const [images, setImages] = useState(null);

  const [largeImage, setLargeImage] = useState('');
  const [modalWin, setModalWin] = useState('');
  // useState

  useEffect(() => {
    setImages(card);
  }, [card, images]);

  const activCardIdx = index => {
    setLargeImage(images[index].largeImageURL, images[index].tags);
  };

  const handleClose = close => {
    if (close) setLargeImage('');
    console.log(modalWin);
    setModalWin(close);
  };

  return (
    <>
      {images &&
        images.map(({ id, previewURL, tags, largeImageURL }, index) => (
          <ImageGalleryItem className="gallery__item" key={index}>
            <img
              src={previewURL}
              alt={tags}
              onClick={() => activCardIdx(index)}
            />
          </ImageGalleryItem>
        ))}

      {largeImage && (
        <ModalWindow win={handleClose}>
          <img src={largeImage} alt="" props={largeImage} />
        </ModalWindow>
      )}
    </>
  );
};

export default ImageItem;
