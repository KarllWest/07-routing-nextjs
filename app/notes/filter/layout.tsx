import LayoutNotes from '@/components/LayoutNotes/LayoutNotes';

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return <LayoutNotes sidebar={sidebar}>{children}</LayoutNotes>;
}