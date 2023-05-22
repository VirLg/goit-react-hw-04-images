import React from 'react';
import { ModalBackdrop, ModalItem } from './ModalWindow.styled';

class ModalWindow extends React.Component {
  state = {
    close: true,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlePressEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePressEscape);
  }
  handlePressEscape = e => {
    console.log('press');
    if (e.code === 'Escape') this.setState({ close: false });
  };

  handleClick = e => {
    console.log(e);
    if (e.target === e.currentTarget) {
      this.setState({ close: false });
    }
  };

  render() {
    return (
      <>
        {this.state.close && (
          <ModalBackdrop className="Modal__Backdrop" onClick={this.handleClick}>
            <ModalItem className="Modal__Item">
              <div>{this.props.children}</div>
            </ModalItem>
          </ModalBackdrop>
        )}
      </>
    );
  }
}

export default ModalWindow;
