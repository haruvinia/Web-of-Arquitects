import { Link } from 'react-router-dom';

export function Arrow({ direction = 'right' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === 'left' ? 'arrow-left' : undefined}
    >
      <path d="M4 12h15m-5-4 5 4-5 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ActionLink({ to, children, dark = false, className = '', arrow = true }) {
  return (
    <Link to={to} className={`action ${dark ? 'action-dark' : ''} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function PageTitle({ light, bold }) {
  return (
    <h1 className="page-title">
      <span>{light}</span>
      <strong>{bold}</strong>
    </h1>
  );
}

export function Pagination({
  current = 1,
  total = 1,
  onPrevious,
  onNext,
  wrap = false,
  className = '',
}) {
  return (
    <div className={`pagination ${className}`}>
      <div className="page-count" aria-live="polite" aria-label={`Page ${current} of ${total}`}>
        <span>{String(current).padStart(2, '0')}</span>
        <i aria-hidden="true" />
        <span>{String(total).padStart(2, '0')}</span>
      </div>
      <div className="pagination-arrows">
        <button
          type="button"
          className="arrow-button"
          aria-label="Previous project"
          disabled={!onPrevious || (!wrap && current === 1)}
          onClick={onPrevious}
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className="arrow-button"
          aria-label="Next project"
          disabled={!onNext || (!wrap && current === total)}
          onClick={onNext}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}

export function Photo({ name, alt, className = '', eager = false }) {
  return (
    <img
      className={className}
      src={`/images/${name}.${name === 'logo' ? 'png' : 'jpg'}`}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
