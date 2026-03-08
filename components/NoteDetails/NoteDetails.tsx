import css from './NoteDetails.module.css';
import { Note } from '@/types/note';

interface NoteDetailsProps {
  note: Note;
  onBack?: () => void; 
}

export default function NoteDetails({ note, onBack }: NoteDetailsProps) {
  if (!note) return null;

  return (
    <main className={css.main}>
      <div className={css.container}>
        
        <button type="button" className={css.backBtn} onClick={onBack}>
          &larr; Back
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          {note.tag && <p className={css.tag}>{note.tag}</p>}
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
          </p>
        </div>
        
      </div>
    </main>
  );
}