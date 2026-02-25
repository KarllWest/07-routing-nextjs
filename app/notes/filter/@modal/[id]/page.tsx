"use client";
import NotePreview from '@/components/NotePreview/NotePreview';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

export default function NoteModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <NotePreview noteId={params.id} />
    </Modal>
  );
}
