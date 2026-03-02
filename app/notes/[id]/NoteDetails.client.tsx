'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/api';
import { Note } from '@/types/note';
import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { useRouter } from 'next/navigation';

export default function NoteDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (isError) return <p style={{ padding: 24 }}>Error loading note details.</p>;
  if (!data) return <p style={{ padding: 24 }}>Note not found.</p>;

  return (
    <NoteDetails 
      note={data} 
      onBack={() => router.back()} 
    />
  );
}