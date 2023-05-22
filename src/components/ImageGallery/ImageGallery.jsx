import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem/ImageItem';
import { ImageGalleryCss } from './ImageGallery.styled';

const ImageGallery = function (props) {
  if (props.options !== []) {
    const { options } = props;

    return (
      <ImageGalleryCss className="gallery">
        <ImageItem card={options} />
      </ImageGalleryCss>
    );
  }
};

export default ImageGallery;

ImageGallery.propTypes = {
  options: PropTypes.array.isRequired,
};
