'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

export default function Notes({ slug }: { slug: string[] }) {
  const tag = slug[0];
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes(tag),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes.</p>;

  return (
    <ul>
      {data?.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}