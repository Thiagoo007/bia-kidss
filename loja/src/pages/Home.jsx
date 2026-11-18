import { IconInstagram, IconRuler, IconSearch, IconWhatsApp } from '../components/Icons.jsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { img, photoProps, photoSize, priceBits, sizeLabel, thumb } from '../data.js';
import { useContact } from '../cart.jsx';
import { useCatalog } from '../catalog.jsx';
import ProductCard from '../components/ProductCard.jsx';
import usePage from '../components/usePage.js';

export default function Home() {
  usePage('');
  const { products, departments, categories, settings } = useCatalog();
  const contact = useContact();
  const week = products.find((p) => p.week);
  const weekPrice = week ? priceBits(week) : null;
  const [gender, setGender] = useState('Tudo');
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    const t = term.trim();
    navigate(t ? `/produtos?q=${encodeURIComponent(t)}` : '/produtos');
  };
  const total = products.filter((p) => gender === 'Tudo' || p.g === gender).length;
  const picks = products.filter((p) => gender === 'Tudo' || p.g === gender).slice(0, 16);

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <h1>{settings.hero_titulo}</h1>
          <p className="hero__lead">{settings.hero_texto}</p>
          <div className="hero__cta">
            <a className="btn btn--solid" href={contact.href()} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /> Chamar a Bia</a>
            <Link className="btn btn--ghost" to="/produtos">Ver as peças</Link>
          </div>
        </div>
        <figure className="hero__photo">
          <img src={img(1)} alt="Menina sorrindo vestindo blusa rosa listrada com babado e sandália dourada" {...photoSize(1)} fetchPriority="high" decoding="async" />
          <p className="note note--a">1 a 16 anos</p>
          <p className="note note--b">meninas e meninos</p>
        </figure>
      </section>

      {categories.length > 1 && (
        <section className="cats" aria-labelledby="cats-h">
          <div className="cats__box">
            <h2 id="cats-h" className="cats__h">Compre por categoria</h2>
            <ul className="cats__list">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link className="cats__item" to={`/produtos?cat=${encodeURIComponent(c.name)}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="parede" aria-labelledby="novas-h">
        <div className="parede__head">
          <h2 id="novas-h">Chegou na Bia KIDSS</h2>
          <form className="hsearch" role="search" onSubmit={search}>
            <label className="vh" htmlFor="home-q">Buscar peças</label>
            <IconSearch width={20} height={20} />
            <input id="home-q" type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Buscar peça" />
            <button type="submit" className="hsearch__go">Buscar</button>
          </form>
          <div className="seg seg--track" role="group" aria-label="Para quem">
            {['Tudo', ...departments].map((g) => (
              <button key={g} type="button" aria-pressed={gender === g} onClick={() => setGender(g)}>{g}</button>
            ))}
          </div>
        </div>
        <div className="grid grid--home">{picks.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        <div className="more">
          <Link className="btn btn--solid" to={gender === 'Tudo' ? '/produtos' : `/produtos?para=${gender}`}>
            Ver todas as {total} peças
          </Link>
        </div>
      </section>

      {week && (
        <section className="semana" aria-labelledby="semana-h">
          <Link to={`/produto/${week.id}`} className="semana__photo" aria-label={`Ver ${week.name}`}>
            <img src={week.photo} alt={week.name} {...photoProps(week)} loading="lazy" decoding="async" />
            <span className="sticker">Promoção da semana</span>
          </Link>
          <div className="semana__copy">
            <h2 id="semana-h">{week.name}</h2>
            <p>
              {week.sizes ? `${sizeLabel(week).replace('Tam.', 'Tamanhos')}. ` : ''}
              {weekPrice.price
                ? <>{weekPrice.old ? <>De <s>{weekPrice.old}</s> por </> : 'Por apenas '}<b>{weekPrice.price}</b>.</>
                : 'Valor pelo atendimento da Bia.'}
            </p>
            <Link className="btn btn--tape" to={`/produto/${week.id}`}>Quero esta peça</Link>
          </div>
        </section>
      )}

      <section className="como" aria-labelledby="como-h">
        <h2 id="como-h">Como o pedido chega até você</h2>
        <div className="trail" aria-hidden="true">
          <span className="trail__line" />
          <span className="trail__go">
            <span className="trail__hop">
              <span className="trail__cube"><i /><i /><i /><i /><i /><i /></span>
            </span>
          </span>
          <span className="trail__shadow" />
        </div>
        <ol className="steps">
          <li><b>Escolha as peças.</b> Cada uma mostra os tamanhos disponíveis.</li>
          <li><b>Monte a sacola.</b> Coloque as peças e escolha o tamanho de cada uma.</li>
          <li><b>A Bia confirma.</b> Você envia a sacola e ela confere tamanho e estoque.</li>
          <li><b>Receba ou retire.</b> Combine entrega ou retirada direto com a Bia.</li>
        </ol>
      </section>

      <section className="insta" aria-labelledby="insta-h">
        <div className="insta__copy">
          <h2 id="insta-h">Veja as novidades no Instagram</h2>
          <p>Toda peça nova aparece primeiro em @{contact.handle}.</p>
          <a className="btn btn--solid" href={contact.instagram} target="_blank" rel="noopener noreferrer"><IconInstagram width={20} height={20} /> Seguir @{contact.handle}</a>
        </div>
        <div className="insta__row" aria-hidden="true">
          {[10, 36, 39, 41].map((id) => <img key={id} src={thumb(id)} alt="" {...photoSize(id, 's')} loading="lazy" decoding="async" />)}
        </div>
      </section>

      <section className="tamanho">
        <span className="tamanho__ico"><IconRuler width={26} height={26} /></span>
        <div className="tamanho__copy">
          <h2>Ficou com dúvida no tamanho?</h2>
          <p>A Bia ajuda a escolher a numeração certa e mostra o que acabou de chegar.</p>
        </div>
        <a className="btn btn--solid" href={contact.href()} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /> {contact.hasNumber ? 'Chamar no WhatsApp' : 'Chamar no direct'}</a>
      </section>
    </>
  );
}
