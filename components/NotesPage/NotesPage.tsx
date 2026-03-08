import css from './NotesPage.module.css';
import { ReactNode } from 'react';

interface NotesPageProps {
  children?: ReactNode;
  toolbar?: ReactNode;
}

export default function NotesPageComponent({ children, toolbar }: NotesPageProps) {
  return (
    <div className={css.app}>

      <header className={css.toolbar}>
        {toolbar}
      </header>

      <div>
        {children}
      </div>

    </div>
  );
}