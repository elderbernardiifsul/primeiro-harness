import { subtotal, totalComDesconto } from './carrinho.mjs';

const itens = [{ nome: 'Livro de JavaScript', preco: 100, quantidade: 1 }];
console.log(JSON.stringify({ itens, subtotal: subtotal(itens), totalProdutos: totalComDesconto(itens) }, null, 2));
