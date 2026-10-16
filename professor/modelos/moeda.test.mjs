import test from 'node:test';
import assert from 'node:assert/strict';
import { subtotal, totalComDesconto } from '../src/carrinho.mjs';

test('subtotal não expõe resíduo binário da soma de centavos', () => {
  const itens = [{ nome: 'A', preco: 0.1, quantidade: 1 }, { nome: 'B', preco: 0.2, quantidade: 1 }];
  assert.equal(subtotal(itens), 0.3);
  assert.equal(totalComDesconto(itens), 0.27);
});
