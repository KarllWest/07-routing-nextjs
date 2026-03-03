import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params?: {
  tag?: string;
  search?: string;
  page?: number;
}): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: Partial<Note>): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}