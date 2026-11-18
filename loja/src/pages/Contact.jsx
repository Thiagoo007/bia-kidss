import { useContact } from '../cart.jsx';
import { useCatalog } from '../catalog.jsx';
import usePage from '../components/usePage.js';
import { IconWhatsApp, IconInstagram, IconPin } from '../components/Icons.jsx';

export default function Contact() {
  usePage('Contato');
  const { settings } = useCatalog();
  const { hasNumber, handle, instagram, href } = useContact();
  const address = settings.endereco_loja;
  const place = address ? `${settings.local_atende}.` : `${settings.local_atende}${settings.local_loja ? `, e loja física em ${settings.local_loja}` : ''}.`;
  const mapHref = address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : '';
  return (
    <div className="page page--contact">
      <h1 className="h2">Fale com a Bia</h1>
      <p className="page__sub">A Bia atende direto: escolhe as peças e confirma tamanho e estoque com você.</p>

      <div className="contact">
        <section className="ccard ccard--main">
          <span className="ccard__ico">{hasNumber ? <IconWhatsApp /> : <IconInstagram />}</span>
          <h2 className="ccard__t">{hasNumber ? 'WhatsApp' : 'Direct do Instagram'}</h2>
          <p>{hasNumber ? 'O jeito mais rápido: manda mensagem e a Bia responde.' : 'O atendimento é pelo direct do Instagram.'}</p>
          <a className="btn btn--solid" href={href()} target="_blank" rel="noopener noreferrer">
            {hasNumber ? 'Chamar no WhatsApp' : `Chamar no direct @${handle}`}
          </a>
        </section>
        <section className="ccard">
          <span className="ccard__ico"><IconInstagram /></span>
          <h2 className="ccard__t">Instagram</h2>
          <p>As novidades aparecem primeiro lá.</p>
          <a className="btn btn--line" href={instagram} target="_blank" rel="noopener noreferrer">@{handle}</a>
        </section>
        <section className="ccard">
          <span className="ccard__ico"><IconPin /></span>
          <h2 className="ccard__t">Onde fica</h2>
          <p>{place} {address && <>Loja física: {address}.</>} Entrega ou retirada combinada com a Bia.</p>
          {mapHref && <a className="btn btn--solid" href={mapHref} target="_blank" rel="noopener noreferrer">Ver no mapa</a>}
        </section>
      </div>
      {!hasNumber && <p className="hint">O número de WhatsApp ainda não foi cadastrado, por isso o atendimento é pelo direct do Instagram.</p>}
    </div>
  );
}
