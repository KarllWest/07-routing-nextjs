import Link from 'next/link';
import css from './SidebarNotes.module.css'; 

const TAGS = ['Work', 'Personal', 'Ideas', 'Important'];

export default function DefaultSidebar() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag.toLowerCase()}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}