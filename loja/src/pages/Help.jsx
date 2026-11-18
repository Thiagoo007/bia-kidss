import { Link } from 'react-router-dom';
import { useCatalog } from '../catalog.jsx';
import usePage from '../components/usePage.js';
import { useContact } from '../cart.jsx';
import { IconChat, IconWhatsApp } from '../components/Icons.jsx';

export default function Help() {
  usePage('Como comprar');
  const { settings } = useCatalog();
  const contact = useContact();
  return (
    <div className="page page--help">
      <h1 className="vh">Como comprar</h1>
      <div className="help__cols">
      <section className="help__steps" aria-label="Passo a passo">
      <h2 className="h3 faqh">Passo a passo</h2>
      <ol className="steps">
        <li><b>Escolha as peças.</b> Cada uma mostra os tamanhos disponíveis.</li>
        <li><b>Monte a sacola.</b> Coloque as peças e escolha o tamanho de cada uma.</li>
        <li><b>A Bia confirma.</b> Você envia a sacola e ela confere tamanho e estoque.</li>
        <li><b>Receba ou retire.</b> Combine entrega ou retirada direto com a Bia.</li>
      </ol>
      <Link className="btn btn--solid" to="/produtos">Ver as peças</Link>
      </section>

      <section className="help__faq">
      <h2 className="h3 faqh">Dúvidas frequentes</h2>
      <div className="faq faq--page">
        {settings.faq.map((f, i) => (
          <details key={f.q} name="duvidas" open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <div className="help__ask">
        <span className="ccard__ico"><IconChat /></span>
        <p><b>Ficou com dúvida?</b> A Bia responde direto, sem compromisso.</p>
        <a className="btn btn--line" href={contact.href('Oi, Bia! Tenho uma dúvida sobre as peças.')} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /> {contact.hasNumber ? 'Chamar no WhatsApp' : 'Chamar no Instagram'}</a>
      </div>
      </section>
      </div>
    </div>
  );
}
