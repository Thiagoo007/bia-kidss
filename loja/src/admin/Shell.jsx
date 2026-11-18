import { useEffect } from 'react';

// Casca própria do painel: não usa o topo, o rodapé nem a sacola da loja.
export default function Shell({ children, bar }) {
  useEffect(() => {
    document.title = 'Painel da Bia KIDSS';
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <div className="adm">
      <header className="adm__brand">
        <img src="/img/logo.jpg" alt="" width="40" height="40" />
        <strong>Painel da Bia KIDSS</strong>
        {bar}
      </header>
      <div className="page">{children}</div>
    </div>
  );
}
