import { createPortal } from 'react-dom';
import { ModalContainer, Overlay } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onEsc, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleExit);

    return () => {
      window.removeEventListener('keydown', handleExit);
    };
  }, []);

  const handleExit = e => {
    if (e.code === 'Escape') {
      onEsc();
    }
  };

  return createPortal(
    <Overlay>
      <ModalContainer>
        <img src={largeImage} alt="" />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
