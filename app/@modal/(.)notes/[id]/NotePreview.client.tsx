'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>
            Created:{' '}
            {note?.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
          </p>
          <button onClick={handleClose} className={css.backBtn}>
            Go back
          </button>
        </div>

        {isLoading && <p>Loading, please wait...</p>}
        {error && !note && <p>Something went wrong.</p>}
      </div>
    </Modal>
  );
}
