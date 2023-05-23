import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem/ImageItem';
import { ImageGalleryCss } from './ImageGallery.styled';

const ImageGallery = function (props) {
  return (
    <ImageGalleryCss className="gallery">
      {props.options !== [] && <ImageItem card={props.options} />}
    </ImageGalleryCss>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  options: PropTypes.array.isRequired,
};
