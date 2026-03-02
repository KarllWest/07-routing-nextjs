import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '70vh', 
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        Welcome to NoteHub
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', marginBottom: '2rem' }}>
        Your personal space for organizing thoughts, tasks, and ideas.
      </p>
      <Link 
        href="/notes/filter/all" 
        style={{ 
          padding: '12px 24px', 
          backgroundColor: '#0d6efd', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '8px', 
          fontSize: '1.1rem', 
          fontWeight: 'bold' 
        }}
      >
        Go to My Notes
      </Link>
    </div>
  );
}