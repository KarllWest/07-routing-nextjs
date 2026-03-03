'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation'; // Додаємо цей хук
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList'; 
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NotesPageComponent from '@/components/NotesPage/NotesPage';

interface NotesPageProps {
  tag: string;
}

function useDebounce(value: string, delay: number): string {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Notes({ tag }: NotesPageProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const page = Number(searchParams.get('page')) || 1;
  
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag: tag !== 'all' ? tag : undefined,
        search: debouncedSearch || undefined,
        page,
      }),
  });

  if (isLoading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (isError) return <p style={{ padding: 24 }}>Error loading notes.</p>;

  return (
    <NotesPageComponent onAddNote={() => setIsModalOpen(true)}>
      <div style={{ marginBottom: '24px' }}>
        <SearchBox 
          value={search} 
          onChange={(val) => {
            setSearch(val);
          }} 
        />
      </div>

      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={data.totalPages} 
          basePath={`/notes/filter/${tag}?page=`} 
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </NotesPageComponent>
  );
}