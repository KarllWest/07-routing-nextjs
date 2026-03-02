import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <span>© 2026 NoteHub</span>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
}