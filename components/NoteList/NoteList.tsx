import Link from 'next/link';
import css from './NoteList.module.css'; 
import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
            <Link href={`/notes/${note.id}`} className={css.link}>View</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}