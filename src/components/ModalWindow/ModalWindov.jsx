import { useState, useEffect } from 'react';

import { ModalBackdrop, ModalItem } from './ModalWindow.styled';
// *Hook

const ModalWindow = props => {
  const [close, setClose] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape);
    // setClose(false);
  }, [close]);
  useEffect(() => {
    props.win(close);
  });

  const handlePressEscape = e => {
    if (e.code === 'Escape') {
      setClose(true);
      console.log('press');
    }
  };
  const handleClick = e => {
    console.log(e);
    if (e.target === e.currentTarget) {
      setClose(true);
    }
  };
  return (
    <>
      (
      <ModalBackdrop className="Modal__Backdrop" onClick={handleClick}>
        <ModalItem className="Modal__Item">
          <div>{props.children}</div>
        </ModalItem>
      </ModalBackdrop>
      )
    </>
  );
};

export default ModalWindow;
