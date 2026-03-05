import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; 
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      {pages.map((page) => (
        <li key={page} className={`${page === currentPage ? css.active : ''}`}>
          <button 
            type="button"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      
      {currentPage < totalPages && (
        <li>
          <button type="button" onClick={() => onPageChange(currentPage + 1)}>
            »
          </button>
        </li>
      )}
    </ul>
  );
}