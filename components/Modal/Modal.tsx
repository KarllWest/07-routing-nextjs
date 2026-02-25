import { ReactNode } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.window} onClick={e => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}
