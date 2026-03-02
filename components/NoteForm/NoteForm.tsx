import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          className={css.input} 
          placeholder="Enter note title..." 
          required 
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="ideas">Ideas</option>
          <option value="important">Important</option>
        </select>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="text">Content</label>
        <textarea 
          id="text" 
          name="content" 
          className={css.textarea} 
          rows={5} 
          placeholder="Write your note here..." 
          required
        />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Save Note
        </button>
      </div>
      
    </form>
  );
}