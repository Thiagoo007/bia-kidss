import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClient, isLive } from './supabase.js';
import { DEFAULT_SETTINGS } from './defaults.js';
import Login from './Login.jsx';
import Shell from './Shell.jsx';
import './admin.css';
import ProductsTab from './ProductsTab.jsx';
import CategoriesTab from './CategoriesTab.jsx';
import PromosTab from './PromosTab.jsx';
import SettingsTab from './SettingsTab.jsx';

const TABS = [
  ['pecas', 'Peças'],
  ['categorias', 'Categorias'],
  ['promocoes', 'Promoções'],
  ['loja', 'Loja'],
];

export default function AdminApp() {
  const [user, setUser] = useState(undefined);
  const [rows, setRows] = useState([]);
  const [dbSettings, setDbSettings] = useState(null);
  const [tab, setTab] = useState('pecas');
  const [msg, setMsg] = useState(null);
  const [loadErr, setLoadErr] = useState(false);

  const notify = useCallback((text, bad = false) => {
    setMsg({ text, bad });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const load = useCallback(async () => {
    try {
      const c = await getClient();
      const [p, s] = await Promise.all([
        c.from('produtos').select('*').order('ordem', { ascending: true }).order('id', { ascending: false }),
        c.from('configuracoes').select('dados').eq('id', 1).maybeSingle(),
      ]);
      if (p.error) throw p.error;
      setRows(p.data);
      setDbSettings((s.data && s.data.dados) || {});
      setLoadErr(false);
    } catch {
      setLoadErr(true);
    }
  }, []);

  useEffect(() => {
    if (!isLive) return undefined;
    let sub;
    let alive = true;
    getClient().then(async (c) => {
      const { data } = await c.auth.getSession();
      if (!alive) return;
      setUser(data.session ? data.session.user : null);
      sub = c.auth.onAuthStateChange((_e, s) => setUser(s ? s.user : null)).data.subscription;
    });
    return () => { alive = false; sub?.unsubscribe(); };
  }, []);

  useEffect(() => { if (user) load(); }, [user, load]);

  const out = async () => {
    const c = await getClient();
    await c.auth.signOut();
    setRows([]);
    setDbSettings(null);
  };

  if (!isLive) {
    return (
      <Shell>
        <h1 className="h2">Gerenciar a loja</h1>
        <p className="page__sub">Esta página ainda não está conectada ao banco de dados da loja. Quem montou o site precisa preencher o arquivo .env (veja o ADMIN-SETUP.md).</p>
      </Shell>
    );
  }
  if (user === undefined) return <Shell><p className="page__sub">Carregando…</p></Shell>;
  if (!user) return <Shell><Login onDone={() => {}} /></Shell>;

  return (
    <Shell bar={<><Link className="linkbtn" to="/">Ver a loja</Link><button type="button" className="linkbtn" onClick={out}>Sair</button></>}>
      <div className="page__head">
        <h1 className="h2">Gerenciar a loja</h1>
        <p className="page__sub">{rows.length} {rows.length === 1 ? 'peça cadastrada' : 'peças cadastradas'}</p>
      </div>

      <div className="adm__top">
        <div className="adm__tabs" role="tablist" aria-label="Seções do painel">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls="adm-panel" onClick={() => { setTab(id); setMsg(null); }}>{label}</button>
          ))}
        </div>
      </div>

      {msg && <p className={`hint${msg.bad ? '' : ' hint--ok'}`} role={msg.bad ? 'alert' : 'status'}>{msg.text}</p>}
      {loadErr && <p className="hint" role="alert">Não consegui carregar os dados. <button type="button" className="linkbtn" onClick={load}>Tentar de novo</button></p>}

      <div id="adm-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === 'pecas' && <ProductsTab rows={rows} reload={load} notify={notify} />}
        {tab === 'categorias' && <CategoriesTab rows={rows} reload={load} notify={notify} />}
        {tab === 'promocoes' && <PromosTab rows={rows} reload={load} notify={notify} />}
        {tab === 'loja' && dbSettings && <SettingsTab settings={{ ...DEFAULT_SETTINGS, ...dbSettings }} reload={load} notify={notify} />}
      </div>
    </Shell>
  );
}
