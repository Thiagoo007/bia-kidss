-- Bia KIDSS: as 40 peças que já estão no site.
-- Rode DEPOIS do setup.sql, uma vez só. As fotos continuam sendo as do próprio site (/img/...).

insert into public.produtos (id, nome, genero, categoria, tamanhos, tamanho_nota, preco, destaque, ativo, foto, foto_w, foto_h, miniatura, mini_w, mini_h, ordem)
overriding system value
values
  (33, 'Vestido moranguinho com bolsa', 'Meninas', 'Vestidos', array[1,2,3,4], '1 a 4', 112, true, true, '/img/p/33.jpg', 1086, 1448, '/img/s/33.jpg', 844, 1125, 1),
  (43, 'Vestido branco com babado', 'Meninas', 'Vestidos', array[4,6,8], null, 139, false, true, '/img/p/43.jpg', 900, 1045, '/img/s/43.jpg', 633, 735, 2),
  (3, 'Conjunto vermelho de blusa babada e short', 'Meninas', 'Conjuntos', array[2,4,8], null, null, false, true, '/img/p/03.jpg', 900, 974, '/img/s/03.jpg', 633, 685, 3),
  (4, 'Vestido branco de alças com babado', 'Meninas', 'Vestidos', array[4,6,10], null, null, false, true, '/img/p/04.jpg', 900, 920, '/img/s/04.jpg', 633, 647, 4),
  (6, 'Conjunto blusa de babados e short mostarda', 'Meninas', 'Conjuntos', array[3,6], null, null, false, true, '/img/p/06.jpg', 900, 974, '/img/s/06.jpg', 633, 685, 5),
  (7, 'Conjunto camiseta caramelo e bermuda', 'Meninos', 'Conjuntos', array[8,14], null, null, false, true, '/img/p/07.jpg', 900, 967, '/img/s/07.jpg', 633, 680, 6),
  (12, 'Conjunto camisa vermelha de botões e bermuda cinza', 'Meninos', 'Conjuntos', array[6,10], null, null, false, true, '/img/p/12.jpg', 900, 974, '/img/s/12.jpg', 633, 685, 7),
  (9, 'Conjunto blusa rosa e saia estampada', 'Meninas', 'Conjuntos', array[12,14,16], null, null, false, true, '/img/p/09.jpg', 900, 974, '/img/s/09.jpg', 633, 685, 8),
  (10, 'Vestido de borboletas', 'Meninas', 'Vestidos', array[8,12,14], null, null, false, true, '/img/p/10.jpg', 900, 957, '/img/s/10.jpg', 633, 673, 9),
  (11, 'Conjunto camiseta vermelha e bermuda bege', 'Meninos', 'Conjuntos', array[8,12,16], null, null, false, true, '/img/p/11.jpg', 900, 928, '/img/s/11.jpg', 633, 653, 10),
  (13, 'Conjunto camisa azul-marinho e bermuda azul', 'Meninos', 'Conjuntos', array[8], null, null, false, true, '/img/p/13.jpg', 900, 960, '/img/s/13.jpg', 633, 675, 11),
  (14, 'Jardineira listrada com camiseta', 'Meninos', 'Jardineiras', array[2], 'M e 2 anos', null, false, true, '/img/p/14.jpg', 511, 550, '/img/s/14.jpg', 511, 550, 12),
  (15, 'Polos lisas brancas e vermelhas', 'Meninos', 'Camisetas e polos', array[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], '1 a 16', null, false, true, '/img/p/15.jpg', 900, 967, '/img/s/15.jpg', 633, 680, 13),
  (20, 'Conjunto colete e short em tons de rosa e marrom', 'Meninas', 'Conjuntos', array[8,12,14,16], null, null, false, true, '/img/p/20.jpg', 511, 555, '/img/s/20.jpg', 511, 555, 14),
  (25, 'Vestido amarelo com alças de babado', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/25.jpg', 1312, 1199, '/img/s/25.jpg', 900, 822, 15),
  (24, 'Vestido jeans com laços', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/24.jpg', 1086, 1448, '/img/s/24.jpg', 844, 1125, 16),
  (35, 'Vestido estampado com bolsa de peixinho', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/35.jpg', 1086, 1448, '/img/s/35.jpg', 844, 1125, 17),
  (18, 'Conjunto de short rosa', 'Meninas', 'Conjuntos', null, null, null, false, true, '/img/p/18.jpg', 1254, 1254, '/img/s/18.jpg', 900, 900, 18),
  (30, 'Conjunto camiseta Sweet Bear e shorts', 'Meninas', 'Conjuntos', null, null, null, false, true, '/img/p/30.jpg', 1536, 1024, '/img/s/30.jpg', 900, 600, 19),
  (19, 'Camiseta tartaruga e bermuda', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/19.jpg', 1254, 1254, '/img/s/19.jpg', 900, 900, 20),
  (2, 'Camiseta Venice Beach e bermuda bege', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/02.jpg', 1217, 1293, '/img/s/02.jpg', 900, 956, 21),
  (21, 'Camiseta azul-marinho e bermuda listrada', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/21.jpg', 1145, 1374, '/img/s/21.jpg', 900, 1080, 22),
  (22, 'Camiseta off-white e bermuda listrada verde', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/22.jpg', 1145, 1374, '/img/s/22.jpg', 900, 1080, 23),
  (27, 'Camiseta de pegadas e bermuda terracota', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/27.jpg', 1086, 1448, '/img/s/27.jpg', 844, 1125, 24),
  (28, 'Camiseta de dinossauros e bermuda bege', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/28.jpg', 1086, 1448, '/img/s/28.jpg', 844, 1125, 25),
  (31, 'Camisa marrom e bermuda bege', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/31.jpg', 1086, 1448, '/img/s/31.jpg', 844, 1125, 26),
  (32, 'Camiseta off-white e bermuda marrom', 'Meninos', 'Conjuntos', null, null, null, false, true, '/img/p/32.jpg', 1086, 1448, '/img/s/32.jpg', 844, 1125, 27),
  (5, 'Vestido vinho com laços', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/05.jpg', 1199, 1312, '/img/s/05.jpg', 900, 985, 28),
  (23, 'Vestido vinho com laço e blusa', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/23.jpg', 1086, 1448, '/img/s/23.jpg', 844, 1125, 29),
  (16, 'Vestido vermelho de babado', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/16.jpg', 900, 1600, '/img/s/16.jpg', 633, 1125, 30),
  (17, 'Conjunto xadrez azul com renda', 'Meninas', 'Conjuntos', null, null, null, false, true, '/img/p/17.jpg', 1254, 1254, '/img/s/17.jpg', 900, 900, 31),
  (26, 'Conjunto branco de babados', 'Meninas', 'Conjuntos', null, null, null, false, true, '/img/p/26.jpg', 900, 1600, '/img/s/26.jpg', 633, 1125, 32),
  (34, 'Vestido pink com laço', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/34.jpg', 1086, 1448, '/img/s/34.jpg', 844, 1125, 33),
  (36, 'Vestido dálmata e gatinhos', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/36.jpg', 1086, 1448, '/img/s/36.jpg', 844, 1125, 34),
  (38, 'Jardineira rosa com blusa de poá', 'Meninas', 'Jardineiras', null, null, null, false, true, '/img/p/38.jpg', 1086, 1448, '/img/s/38.jpg', 844, 1125, 35),
  (39, 'Vestido verde-oliva de babados', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/39.jpg', 1086, 1448, '/img/s/39.jpg', 844, 1125, 36),
  (40, 'Vestido bege com renda', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/40.jpg', 1023, 1537, '/img/s/40.jpg', 749, 1125, 37),
  (41, 'Vestido rosa com laços no ombro', 'Meninas', 'Vestidos', null, null, null, false, true, '/img/p/41.jpg', 1023, 1537, '/img/s/41.jpg', 749, 1125, 38),
  (42, 'Conjunto rosa de colete e saia', 'Meninas', 'Conjuntos', null, null, null, false, true, '/img/p/42.jpg', 1086, 1448, '/img/s/42.jpg', 844, 1125, 39),
  (44, 'Conjunto listrado marinho', 'Meninas', 'Conjuntos', null, null, null, false, true, '/img/p/44.jpg', 1448, 1086, '/img/s/44.jpg', 900, 675, 40)
on conflict (id) do nothing;

-- Peças novas cadastradas pela Bia começam no número 1000.
alter table public.produtos alter column id restart with 1000;
