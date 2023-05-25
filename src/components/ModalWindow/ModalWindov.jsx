import { useEffect } from 'react';

import { ModalBackdrop, ModalItem } from './ModalWindow.styled';
// *Hook

const ModalWindow = props => {
  useEffect(() => {
    const handlePressEscape = e => {
      if (e.code === 'Escape') {
        props.win(true);

        console.log('press');
      }
    };
    document.addEventListener('keydown', handlePressEscape);
    return document.removeEventListener('keydown', handlePressEscape);
  }, [props]);

  const handleClick = e => {
    console.log(e);
    if (e.target === e.currentTarget) {
      props.win(true);
    }
  };
  return (
    <>
      <ModalBackdrop className="Modal__Backdrop" onClick={handleClick}>
        <ModalItem className="Modal__Item">
          <div>{props.children}</div>
        </ModalItem>
      </ModalBackdrop>
    </>
  );
};

export default ModalWindow;
