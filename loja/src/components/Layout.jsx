import { IconBag, IconWhatsApp, IconInstagram } from './Icons.jsx';
import { Suspense, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useContact, useCart } from '../cart.jsx';
import { useCatalog } from '../catalog.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

function ScrollTop() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (first.current) { first.current = false; return; }
    document.getElementById('conteudo')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { count } = useCart();
  const { settings } = useCatalog();
  const contact = useContact();
  const { pathname } = useLocation();
  const link = ({ isActive }) => (isActive ? 'is-here' : undefined);
  const bag = `Sacola, ${count} ${count === 1 ? 'item' : 'itens'}`;

  return (
    <div className="frame">
      <ScrollTop />
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      {settings.aviso && (
        <div className="aviso" role="note">
          {settings.aviso_link
            ? <a href={settings.aviso_link} target={/^https?:/.test(settings.aviso_link) ? '_blank' : undefined} rel="noopener noreferrer">{settings.aviso}</a>
            : settings.aviso}
        </div>
      )}
      <header className="top">
        <Link className="brand" to="/" aria-label="Bia KIDSS, página inicial">
          <img src="/img/logo.jpg" alt="" width="56" height="56" />
          <span>Bia KIDSS</span>
        </Link>
        <nav className="top__nav" aria-label="Principal">
          <NavLink to="/" end className={link}>Início</NavLink>
          <NavLink to="/produtos" className={link}>Peças</NavLink>
          <NavLink to="/ajuda" className={link}>Como comprar</NavLink>
          <NavLink to="/contato" className={link}>Contato</NavLink>
        </nav>
        <Link className="bagbtn" to="/sacola" aria-label={bag}><IconBag width={20} height={20} /> Sacola <b>{count}</b></Link>
      </header>

      <main id="conteudo" tabIndex="-1">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      {count > 0 && pathname !== '/sacola' && (
        <Link className="fab" to="/sacola" aria-label={bag}>Sacola <b>{count}</b></Link>
      )}

      <footer className="foot">
        <div className="foot__brand">
          <img src="/img/logo.jpg" alt="" width="64" height="64" />
          <div>
            <strong>Bia KIDSS</strong>
            <p>Moda infantil com muito estilo e carinho.<br />{settings.local_atende}{settings.local_loja && <><br />Loja física em {settings.local_loja}</>}</p>
          </div>
        </div>
        <nav aria-label="Rodapé">
          <Link to="/">Início</Link>
          <Link to="/produtos">Peças</Link>
          <Link to="/ajuda">Como comprar</Link>
          <Link to="/contato">Contato</Link>
        </nav>
        <div className="foot__social">
          <a href={contact.href()} target="_blank" rel="noopener noreferrer" aria-label={contact.hasNumber ? 'WhatsApp' : 'Direct do Instagram'}><IconWhatsApp width={22} height={22} /></a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram @${contact.handle}`}><IconInstagram width={22} height={22} /></a>
        </div>
        <p className="foot__legal">© 2026 Bia KIDSS. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
