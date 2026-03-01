import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });

  if (isLoading) return <div className={css.content}>Loading...</div>;
  if (error) return <div className={css.content}>Error loading note</div>;
  if (!data) return <div className={css.content}>Note not found</div>;

  return (
    <div className={css.modal}>
      <div className={css.content}>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <div>
          <strong>Tags:</strong> {data.tags.join(', ')}
        </div>
        <div style={{ fontSize: '0.8em', color: '#888', marginTop: 8 }}>
          Created: {new Date(data.createdAt).toLocaleString()}<br />
          Updated: {new Date(data.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
