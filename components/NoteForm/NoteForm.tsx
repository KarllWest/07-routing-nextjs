'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel?: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Todo');
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createNote({ title, tag, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel?.();
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>

      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className={css.input}
          placeholder="Enter note title..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" className={css.select} value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          rows={5}
          placeholder="Write your note here..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Note'}
        </button>
      </div>

    </form>
  );
}