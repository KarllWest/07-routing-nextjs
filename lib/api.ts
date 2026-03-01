import axios from 'axios';
import { Note } from '@/types/note';

const API_URL = 'https://notehub-api.goit.global';

export async function fetchNotes(tag?: string): Promise<Note[]> {
  const params = tag && tag !== 'all' ? { tag } : {};
  const { data } = await axios.get(`${API_URL}/notes`, { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get(`${API_URL}/notes/${id}`);
  return data;
}
