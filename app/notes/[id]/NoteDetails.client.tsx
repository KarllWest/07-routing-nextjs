'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NoteDetails({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note.</p>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
      <p><strong>Tag:</strong> {data?.tags}</p>
      <p><strong>Created:</strong> {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}</p>
    </div>
  );
}