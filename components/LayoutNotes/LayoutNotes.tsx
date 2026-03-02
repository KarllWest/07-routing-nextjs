import React from 'react';
import css from './LayoutNotes.module.css';

interface LayoutNotesProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode; 
}

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      {sidebar && (
        <aside className={css.sidebar}>
          {sidebar}
        </aside>
      )}
      
      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  );
}