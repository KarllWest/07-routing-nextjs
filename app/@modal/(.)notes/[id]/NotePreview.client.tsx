'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const params = useParams();
  const noteId = id || (params?.id as string);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note.</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data?.title}</h2>
      <p>{data?.content}</p>
      <p><strong>Tags:</strong> {data?.tags?.join(', ')}</p>
      <p><strong>Created:</strong> {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}</p>
    </Modal>
  );
}