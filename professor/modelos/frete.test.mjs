import test from 'node:test';
import assert from 'node:assert/strict';
import { checkout } from '../src/carrinho.mjs';

test('frete considera valor após desconto, arredondamento e limite inclusivo', () => {
  for (const [preco, totalProdutos, frete, total] of [
    [200, 180, 15, 195], [222.21, 199.99, 15, 214.99],
    [222.22, 200, 0, 200], [222.23, 200.01, 0, 200.01],
  ]) {
    const entrada = [{ nome: 'Item', preco, quantidade: 1 }];
    const copia = structuredClone(entrada);
    const esperadoDesconto = Math.round((preco - totalProdutos) * 100) / 100;
    assert.deepEqual(checkout(entrada), { subtotal: preco, desconto: esperadoDesconto, totalProdutos, frete, total });
    assert.deepEqual(entrada, copia);
  }
});

test('checkout vazio e entradas inválidas', () => {
  assert.deepEqual(checkout([]), { subtotal: 0, desconto: 0, totalProdutos: 0, frete: 0, total: 0 });
  assert.throws(() => checkout([{ nome: 'X', preco: 10, quantidade: 0 }]));
});
