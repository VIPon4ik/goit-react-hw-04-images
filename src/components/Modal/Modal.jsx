import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalContainer, Overlay } from './Modal.styled';

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

Modal.propTypes = {
  onEsc: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
}

export default Modal;
