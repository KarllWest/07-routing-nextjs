'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function InterceptedNoteModal({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const router = useRouter();
  
  const { id } = use(params);

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview noteId={id} />
    </Modal>
  );
}