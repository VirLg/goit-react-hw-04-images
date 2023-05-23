import { useState, useEffect } from 'react';

import { ModalBackdrop, ModalItem } from './ModalWindow.styled';
// *Hook

const ModalWindow = props => {
  console.log(props);
  const [close, setClose] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape);
    // setClose(false);
  }, [close]);
  useEffect(() => {
    props.win(close);
  });

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handlePressEscape);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handlePressEscape);
  // }
  const handlePressEscape = e => {
    if (e.code === 'Escape') {
      setClose(true);
      console.log('press');
    }
  };
  const handleClick = e => {
    console.log(e);
    if (e.target === e.currentTarget) {
      setClose(false);
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

//*Class
// class ModalWindow extends React.Component {
//   state = {
//     close: true,
//   };

//   componentDidMount() {
//     document.addEventListener('keydown', this.handlePressEscape);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handlePressEscape);
//   }
//   handlePressEscape = e => {
//     console.log('press');
//     if (e.code === 'Escape') this.setState({ close: false });
//   };

//   handleClick = e => {
//     console.log(e);
//     if (e.target === e.currentTarget) {
//       this.setState({ close: false });
//     }
//   };

//   render() {
//     return (
//       <>
//         {this.state.close && (
//           <ModalBackdrop className="Modal__Backdrop" onClick={this.handleClick}>
//             <ModalItem className="Modal__Item">
//               <div>{this.props.children}</div>
//             </ModalItem>
//           </ModalBackdrop>
//         )}
//       </>
//     );
//   }
// }

export default ModalWindow;
