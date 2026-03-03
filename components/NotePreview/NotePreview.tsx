'use client';

import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api'; 
import { Note } from '@/types/note';
import { useRouter } from 'next/navigation'; 

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter(); 
  
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });

  if (isLoading) return <div className={css.container}><div className={css.content}>Loading...</div></div>;
  if (error) return <div className={css.container}><div className={css.content}>Error loading note</div></div>;
  if (!data) return <div className={css.container}><div className={css.content}>Note not found</div></div>;

  return (
    <div className={css.container}>
      <div className={css.item}>

        <div className={css.header}>
          <h2>{data.title}</h2>
          {data.tag && <span className={css.tag}>{data.tag}</span>}
        </div>

        <div className={css.content}>
          {data.content}
        </div>

        <div className={css.date}>
          Created: {data.createdAt ? new Date(data.createdAt).toLocaleString() : ''}
          {data.updatedAt && (
            <>
              <br />
              Updated: {new Date(data.updatedAt).toLocaleString()}
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}