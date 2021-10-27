import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export default function Modal({ toggleModal,children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return window.removeEventListener('keydown', handleClose);
  });

  const handleEscape = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleClose = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={s.backDrop} onClick={handleClose}>
      <div className={s.content}>{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}
