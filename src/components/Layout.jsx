import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { contact, navigation } from '../data';
import { Photo } from './UI';

function ContactIcon({ kind }) {
  const paths = {
    location: (
      <>
        <path d="M12 21s7-7 7-13a7 7 0 0 0-14 0c0 6 7 13 7 13Z" />
        <circle cx="12" cy="8" r="2.5" />
      </>
    ),
    phone: <path d="m5 3 4 4-2 3c1 3 4 6 7 7l3-2 4 4c-1 3-4 3-7 2C8 19 3 14 2 8c-1-3 0-5 3-5Z" />,
    email: (
      <>
        <rect x="2" y="4" width="20" height="16" />
        <path d="m2 4 10 9L22 4M2 20l7-8m13 8-7-8" />
      </>
    ),
  };
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}

function SocialIcons() {
  return (
    <div className="social-icons" aria-label="Social media symbols from the prototype">
      <span aria-label="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v9Z" />
        </svg>
      </span>
      <span aria-label="Twitter">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 5c-1 .5-2 .8-3 .9a5 5 0 0 0 2-2.8c-1 .6-2 1-3 1.2a5 5 0 0 0-8 4.5A14 14 0 0 1 1 3.5a5 5 0 0 0 1.5 6.6L.5 9.5a5 5 0 0 0 4 5L3 15a5 5 0 0 0 4.5 3.5A10 10 0 0 1 0 20a14 14 0 0 0 21-12v-.6Z" />
        </svg>
      </span>
      <span aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 2h20v20H2Z" />
          <path
            d="M6 10v9m0-13v1m5 12v-9m0 4c0-5 7-5 7 0v5"
            stroke="#2c2c2c"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </span>
      <span className="pinterest" aria-label="Pinterest">
        p
      </span>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
    const active = navigation.find(({ path }) =>
      path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
    );
    document.title = `${active?.label ?? 'Main'} | Digital Project`;
  }, [location]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header container">
        <Link to="/" aria-label="Digital Project home" onClick={() => setMenuOpen(false)}>
          <Photo name="logo" alt="Digital Project" className="logo" eager />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav
          id="main-navigation"
          className={menuOpen ? 'navigation is-open' : 'navigation'}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setMenuOpen(false);
              document.querySelector('.menu-toggle')?.focus();
            }
          }}
        >
          {navigation.map(({ label, path }) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-content container">
          <Link to="/" aria-label="Digital Project home">
            <Photo name="logo" alt="Digital Project" className="footer-logo" />
          </Link>
          <div>
            <h2>Information</h2>
            <nav aria-label="Footer navigation">
              {navigation.map(({ label, path }) => (
                <Link key={path} to={path}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-contacts">
            <h2>Contacts</h2>
            <p>
              <ContactIcon kind="location" />
              <span>
                1234 Sample Street
                <br />
                Austin Texas 78704
              </span>
            </p>
            <a href={contact.phoneHref}>
              <ContactIcon kind="phone" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <ContactIcon kind="email" />
              {contact.email}
            </a>
          </div>
          <div>
            <h2>Social Media</h2>
            <SocialIcons />
          </div>
        </div>
        <div className="copyright">© 2021 All Rights Reserved</div>
      </footer>
    </>
  );
}
