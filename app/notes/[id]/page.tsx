import NotePreview from '@/components/NotePreview/NotePreview';

export default async function NoteModalPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return <NotePreview noteId={id} />;
}