import { useState, useEffect } from 'react';
import ModalWindow from '../ModalWindow/ModalWindov';
import { ImageGalleryItem } from './ImageItem.styled';
//* Hooks

const ImageItem = props => {
  const { card } = props;
  // useState
  const [images, setImages] = useState(null);
  const [activCard, setActivCard] = useState(null);
  const [toggleSwitcher, setToggleSwitcher] = useState(false);
  // useState

  const toggleModal = () => {
    setToggleSwitcher(!setToggleSwitcher);
  };

  useEffect(() => {
    setImages(card);
  }, [card, images]);

  function handleActivCard(largeImageURL) {
    if (largeImageURL) {
      setActivCard(largeImageURL);

      toggleModal();
    }

    console.log(largeImageURL);
    return largeImageURL;
  }

  return (
    <>
      {images &&
        images.map(({ id, previewURL, tags, largeImageURL }, idx) => (
          <ImageGalleryItem className="gallery__item" key={idx}>
            <img
              src={previewURL}
              alt={tags}
              onClick={() => handleActivCard(largeImageURL)}
            />
          </ImageGalleryItem>
        ))}

      {toggleSwitcher && (
        <ModalWindow>
          <img src={activCard} alt="" />
        </ModalWindow>
      )}
    </>
  );
};

// Class
// class ImageItem extends Component {
//   state = {
//     images: null,
//     activeCard: null,
//     toggleSwitch: false,
//   };

//   toggleModal = () => {
//     this.setState({ toggleSwitch: !this.state.toggleSwitch });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.images !== this.props.card) {
//       console.log(this.state.images);
//       this.setState(() => ({ images: this.props.card }));
//     }
//   }

//   handleActivCard = largeImageURL => {
//     if (largeImageURL) {
//       this.setState({ activeCard: largeImageURL });
//       this.toggleModal();
//     }

//     console.log(largeImageURL);
//     return largeImageURL;
//   };

//   render() {
//     return (
//       <>
//         {this.state.images &&
//           this.state.images.map(
//             ({ id, previewURL, tags, largeImageURL }, idx) => (
//               <ImageGalleryItem className="gallery__item" key={idx}>
//                 <img
//                   src={previewURL}
//                   alt={tags}
//                   onClick={() => this.handleActivCard(largeImageURL)}
//                 />
//               </ImageGalleryItem>
//             )
//           )}

//         {this.state.toggleSwitch && (
//           <ModalWindow>
//             <img src={this.state.activeCard} alt="" />
//           </ModalWindow>
//         )}
//       </>
//     );
//   }
// }

export default ImageItem;
