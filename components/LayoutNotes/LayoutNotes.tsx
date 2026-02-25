import css from './LayoutNotes.module.css';

export default function LayoutNotes({ children }: { children: React.ReactNode }) {
  return <div className={css.layoutNotes}>{children}</div>;
}
