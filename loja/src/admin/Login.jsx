import { useState } from 'react';
import { getClient } from './supabase.js';

export default function Login({ onDone }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [busy, setBusy] = useState(false);

  const enter = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErro('');
    try {
      const c = await getClient();
      const { error } = await c.auth.signInWithPassword({ email: email.trim(), password: senha });
      if (error) setErro('E-mail ou senha não conferem.');
      else onDone();
    } catch {
      setErro('Não consegui conectar. Verifique a internet e tente de novo.');
    }
    setBusy(false);
  };

  return (
    <form className="adm__login" onSubmit={enter}>
      <h1 className="h2">Gerenciar a loja</h1>
      <p className="page__sub">Entre com o e-mail e a senha da loja.</p>
      <label className="adm__field"><span>E-mail</span>
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="adm__field"><span>Senha</span>
        <input type="password" autoComplete="current-password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      {erro && <p className="hint" role="alert">{erro}</p>}
      <button type="submit" className="btn btn--solid" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
    </form>
  );
}
