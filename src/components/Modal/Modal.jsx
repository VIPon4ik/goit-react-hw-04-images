import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleExit)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleExit);
  }

  handleExit = e => {
    if (e.code === 'Escape') {
      this.props.onEsc();
    }
  }

  render() {
    const { largeImage } = this.props;
    return createPortal(
      <Overlay>
        <ModalContainer>
          <img src={largeImage} alt=''/>
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}
