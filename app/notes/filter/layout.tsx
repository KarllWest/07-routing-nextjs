export default function NotesFilterLayout({
  children,
  sidebar,
  modal
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <aside>{sidebar}</aside>
      <main style={{ flex: 1, position: 'relative' }}>{children}{modal}</main>
    </div>
  );
}
