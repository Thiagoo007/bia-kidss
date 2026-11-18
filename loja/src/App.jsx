import { Suspense, lazy } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';

const Product = lazy(() => import('./pages/Product.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Help = lazy(() => import('./pages/Help.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Recomeça o estado da página (tamanho escolhido, aviso) ao trocar de peça.
function ProductRoute() {
  const { id } = useParams();
  return <Product key={id} />;
}

export default function App() {
  return (
    <Routes>
      {/* Painel da Bia: fora do layout da loja, sem link em nenhuma página do site. */}
      <Route path="admin" element={<Suspense fallback={null}><AdminApp /></Suspense>} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="produtos" element={<Products />} />
        <Route path="produto/:id" element={<ProductRoute />} />
        <Route path="sacola" element={<Cart />} />
        <Route path="ajuda" element={<Help />} />
        <Route path="contato" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
