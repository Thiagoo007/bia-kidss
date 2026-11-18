// Ajusta a saída de `vite build -c vite.standalone.config.js` para funcionar em qualquer
// endereço (GitHub Pages em subpasta, ou abrindo o index.html direto do disco).
import { readFileSync, writeFileSync, renameSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const out = new URL('../dist-pages/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const js = join(out, 'assets', 'site.js');
writeFileSync(js, readFileSync(js, 'utf8').replace(/(["'`])\/img\//g, '$1./img/'));

const fix = `  <script>
    // Fotos que vêm do catálogo como "/img/..." são lidas da pasta do próprio site.
    (function () {
      var set = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function (n, v) {
        if ((n === 'src' || n === 'poster') && typeof v === 'string' && v.indexOf('/img/') === 0) v = '.' + v;
        return set.call(this, n, v);
      };
      var d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
      if (d && d.set) {
        Object.defineProperty(HTMLImageElement.prototype, 'src', {
          configurable: true, enumerable: d.enumerable, get: d.get,
          set: function (v) { if (typeof v === 'string' && v.indexOf('/img/') === 0) v = '.' + v; d.set.call(this, v); }
        });
      }
    })();
  </script>
`;
const html = readFileSync(join(out, 'standalone.html'), 'utf8').replace(
  /<script type="module" crossorigin src="\.\/assets\/site\.js"><\/script>/,
  fix + '  <script defer src="./assets/site.js"></script>',
);
writeFileSync(join(out, 'index.html'), html);
writeFileSync(join(out, '404.html'), html);
rmSync(join(out, 'standalone.html'));
if (existsSync(join(out, '_redirects'))) rmSync(join(out, '_redirects'));
console.log('Pronto: loja/dist-pages');
