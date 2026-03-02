'use client';

import { ReactNode } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      
      // Замінили css.window на css.modal
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} type="button" style={{ float: 'right', cursor: 'pointer' }}>
          &times;
        </button>
        
        {children}
      </div>
    </div>
  );
}