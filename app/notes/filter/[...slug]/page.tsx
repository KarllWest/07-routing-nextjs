"use client";

import { useRouter } from 'next/navigation';

export default function NotesByTagPage({ params }: { params: { tag: string[] } }) {
  const tag = params.tag?.[0];
  return <div>Notes filtered by tag: {tag === 'all' ? 'All notes' : tag}</div>;
}
