import css from './NotesPage.module.css';
import { ReactNode } from 'react';

interface NotesPageProps {
  children?: ReactNode;
  onAddNote?: () => void;
}

export default function NotesPageComponent({ children, onAddNote }: NotesPageProps) {
  return (
    <div className={css.app}>

      <div className={css.toolbar}>
        <h2>My Notes</h2>

        <button type="button" className={css.button} onClick={onAddNote}>
          + Add Note
        </button>
      </div>

      <div>
        {children}
      </div>

    </div>
  );
}