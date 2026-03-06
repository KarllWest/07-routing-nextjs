'use client';

import css from './NotePreview.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import { fetchNoteById, deleteNote } from '@/lib/api'; 
import { Note } from '@/types/note';
import { useRouter } from 'next/navigation'; 

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter(); 
  const queryClient = useQueryClient(); 
  
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(noteId);
    }
  };

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
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleDelete} 
            disabled={deleteMutation.isPending}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer'
            }}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>

      </div>
    </div>
  );
}