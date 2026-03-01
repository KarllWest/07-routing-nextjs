export default function NoteModal({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>Modal for note with id: {params.id}</p>
    </div>
  );
}