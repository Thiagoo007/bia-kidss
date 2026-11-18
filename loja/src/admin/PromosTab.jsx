import { useMemo, useState } from 'react';
import { brl } from './supabase.js';
import { errorText, updateMany } from './lib.js';

const r2 = (n) => Math.round(n * 100) / 100;

export default function PromosTab({ rows, reload, notify }) {
  const [scope, setScope] = useState('todas'); // todas | cat:<nome> | dep:<nome>
  const [pct, setPct] = useState('20');
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const cats = useMemo(() => [...new Set(rows.map((r) => r.categoria).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [rows]);
  const depts = useMemo(() => [...new Set(rows.map((r) => r.genero))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [rows]);

  const inScope = useMemo(() => rows.filter((r) => r.ativo && (scope === 'todas'
    || (scope.startsWith('cat:') && r.categoria === scope.slice(4))
    || (scope.startsWith('dep:') && r.genero === scope.slice(4)))), [rows, scope]);
  const promos = rows.filter((r) => r.preco_antigo != null);
  const value = Number(String(pct).replace(',', '.'));
  const valid = Number.isFinite(value) && value >= 1 && value <= 90;
  const withPrice = inScope.filter((r) => r.preco != null);
  const noPrice = inScope.length - withPrice.length;

  // Desconto sempre sobre o "preço de antes" (se já está em promoção) ou sobre o preço atual.
  const plan = withPrice.map((r) => {
    const base = r.preco_antigo != null ? Number(r.preco_antigo) : Number(r.preco);
    return { id: r.id, nome: r.nome, base, novo: r2(base * (1 - value / 100)) };
  });

  const run = async (items, okText) => {
    setBusy(true);
    try {
      await updateMany(items);
      notify(okText);
      setConfirm(null);
      await reload();
    } catch (err) {
      notify(errorText(err), true);
    }
    setBusy(false);
  };

  const apply = () => run(plan.map((p) => ({ id: p.id, set: { preco: p.novo, preco_antigo: p.base } })), `Desconto de ${value}% aplicado em ${plan.length} ${plan.length === 1 ? 'peça' : 'peças'}.`);
  const endAll = (list) => run(list.map((r) => ({ id: r.id, set: { preco: r.preco_antigo, preco_antigo: null } })), `Promoção encerrada em ${list.length} ${list.length === 1 ? 'peça' : 'peças'}. O preço voltou ao valor de antes.`);

  return (
    <>
      <section className="adm__group">
        <h2 className="h3">Aplicar desconto</h2>
        <p className="adm__help">Escolha onde aplicar e quantos por cento. O preço atual vira o "preço de antes" e as peças passam a aparecer com selo de desconto e na aba Promoções do site. Peças sem preço não entram.</p>

        <div className="adm__pair">
          <label className="adm__field"><span>Onde aplicar</span>
            <select value={scope} onChange={(e) => { setScope(e.target.value); setConfirm(null); }}>
              <option value="todas">Todas as peças do site</option>
              {cats.length > 0 && <optgroup label="Uma categoria">{cats.map((c) => <option key={c} value={`cat:${c}`}>{c}</option>)}</optgroup>}
              {depts.length > 0 && <optgroup label="Para quem">{depts.map((d) => <option key={d} value={`dep:${d}`}>{d}</option>)}</optgroup>}
            </select>
          </label>
          <label className="adm__field"><span>Desconto (%)</span>
            <input type="text" inputMode="numeric" value={pct} onChange={(e) => { setPct(e.target.value); setConfirm(null); }} />
          </label>
        </div>

        {!valid && <p className="hint" role="alert">Escreva um desconto entre 1 e 90.</p>}
        {valid && (
          <p className="adm__note">
            {plan.length === 0
              ? 'Nenhuma peça com preço nesse grupo.'
              : `Vai afetar ${plan.length} ${plan.length === 1 ? 'peça' : 'peças'}. Exemplo: ${plan[0].nome}, de ${brl(plan[0].base)} por ${brl(plan[0].novo)}.`}
            {noPrice > 0 && ` ${noPrice} ${noPrice === 1 ? 'peça sem preço fica' : 'peças sem preço ficam'} de fora.`}
          </p>
        )}

        {confirm === 'apply' ? (
          <p className="hint">
            Aplicar {value}% em {plan.length} {plan.length === 1 ? 'peça' : 'peças'} agora?{' '}
            <button type="button" className="linkbtn" disabled={busy} onClick={apply}>{busy ? 'Aplicando…' : 'Sim, aplicar'}</button>{' '}
            <button type="button" className="linkbtn" onClick={() => setConfirm(null)}>Cancelar</button>
          </p>
        ) : (
          <button type="button" className="btn btn--solid" disabled={!valid || plan.length === 0} onClick={() => setConfirm('apply')}>Aplicar desconto</button>
        )}
      </section>

      <section className="adm__group">
        <h2 className="h3">Peças em promoção agora ({promos.length})</h2>
        {promos.length === 0 ? (
          <p className="adm__help">Nenhuma peça em promoção. Você também pode dar desconto em uma peça só, preenchendo o "preço de antes" ao editar a peça.</p>
        ) : (
          <>
            <ul className="adm__cats">
              {promos.map((r) => (
                <li key={r.id}>
                  <span><strong>{r.nome}</strong> <small>{brl(r.preco_antigo)} → {brl(r.preco)} (-{Math.round((1 - r.preco / r.preco_antigo) * 100)}%)</small></span>
                  <button type="button" className="linkbtn" disabled={busy} onClick={() => endAll([r])}>Encerrar</button>
                </li>
              ))}
            </ul>
            {confirm === 'end' ? (
              <p className="hint">
                Encerrar a promoção das {promos.length} peças? O preço volta ao valor de antes.{' '}
                <button type="button" className="linkbtn" disabled={busy} onClick={() => endAll(promos)}>Sim, encerrar tudo</button>{' '}
                <button type="button" className="linkbtn" onClick={() => setConfirm(null)}>Cancelar</button>
              </p>
            ) : (
              <button type="button" className="btn btn--ghost" onClick={() => setConfirm('end')}>Encerrar todas as promoções</button>
            )}
          </>
        )}
      </section>
    </>
  );
}
