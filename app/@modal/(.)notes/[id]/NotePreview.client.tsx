'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';

export default function NotePreview({ id }: { id: string }) {
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
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', maxWidth: '500px', width: '100%' }}>
        <button onClick={() => router.back()}>✕ Close</button>
        <h2>{data?.title}</h2>
        <p>{data?.content}</p>
        <p><strong>Tag:</strong> {data?.tags}</p>
        <p><strong>Created:</strong> {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}</p>
      </div>
    </div>
  );
}