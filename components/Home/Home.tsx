import css from './Home.module.css';

export default function HomeComponent() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          This is the best place to manage your notes, filter them by tags, and stay organized.
        </p>
      </div>
    </main>
  );
}