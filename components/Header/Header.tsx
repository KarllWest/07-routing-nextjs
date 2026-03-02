import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.headerLink}>
        NoteHub
      </Link>
      
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link href="/" className={styles.navigationLink}>Home</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link href="/notes/filter/all" className={styles.navigationLink}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}