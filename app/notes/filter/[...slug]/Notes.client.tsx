'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NotesPageComponent from '@/components/NotesPage/NotesPage';
import css from '@/components/NotesPage/NotesPage.module.css';

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag: tag !== 'all' ? tag : undefined,
        search: debouncedSearch || undefined,
        page,
      }),
  });

  return (
    <NotesPageComponent
      toolbar={
        <>
          <SearchBox
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
          />
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
          <button
            type="button"
            className={css.button}
            onClick={() => setIsModalOpen(true)}
          >
            Create note +
          </button>
        </>
      }
    >
      {isLoading && <p style={{ padding: 24 }}>Loading...</p>}
      {isError && <p style={{ padding: 24 }}>Error loading notes.</p>}

      {!isLoading && !isError && data?.notes && data.notes.length === 0 && (
        <p style={{ padding: 24 }}>No notes found.</p>
      )}

      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </NotesPageComponent>
  );
}
