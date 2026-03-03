'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api'; 
import Modal from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  if (isLoading) return <Modal onClose={() => router.back()}><p>Loading...</p></Modal>;
  if (isError) return <Modal onClose={() => router.back()}><p>Error loading note</p></Modal>;
  if (!data) return <Modal onClose={() => router.back()}><p>Note not found</p></Modal>;

  return (
    <Modal onClose={() => router.back()}>
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
            Created: {new Date(data.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Modal>
  );
}