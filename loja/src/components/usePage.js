import { useEffect } from 'react';
export default function usePage(title) {
  useEffect(() => { document.title = title ? `${title} · Bia KIDSS` : 'Bia KIDSS · Moda infantil em Brasília'; }, [title]);
}
