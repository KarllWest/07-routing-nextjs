import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = typeof window === 'undefined'
  ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  : '';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params?: {
  tag?: string;
  search?: string;
  page?: number;
}): Promise<NotesResponse> {
  const { data } = await axios.get<NotesResponse>(`${BASE_URL}/api/notes`, { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${BASE_URL}/api/notes/${id}`);
  return data;
}

export async function createNote(note: Partial<Note>): Promise<Note> {
  const { data } = await axios.post<Note>(`${BASE_URL}/api/notes`, note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`${BASE_URL}/api/notes/${id}`);
  return data;
}
