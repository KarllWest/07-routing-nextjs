import axios from 'axios';
import { Note } from '@/types/note';

const API_URL = 'https://notehub-api.goit.global';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params?: {
  tag?: string;
  search?: string;
  page?: number;
}): Promise<NotesResponse> {
  const { data } = await axios.get<NotesResponse>(`${API_URL}/notes`, {
    headers,
    params,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${API_URL}/notes/${id}`, { headers });
  return data;
}

export async function createNote(note: Partial<Note>): Promise<Note> {
  const { data } = await axios.post<Note>(`${API_URL}/notes`, note, { headers });
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await axios.delete(`${API_URL}/notes/${id}`, { headers });
}