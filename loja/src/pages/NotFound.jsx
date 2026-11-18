import { Link } from 'react-router-dom';
import usePage from '../components/usePage.js';

export default function NotFound() {
  usePage('Página não encontrada');
  return (
    <div className="page page--narrow">
      <h1 className="h2">Essa página não existe.</h1>
      <p className="page__sub">O endereço pode ter mudado, ou a peça saiu do catálogo.</p>
      <Link className="btn btn--solid" to="/produtos">Ver as peças</Link>
    </div>
  );
}
