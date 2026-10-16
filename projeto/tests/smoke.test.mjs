import test from 'node:test';
import assert from 'node:assert/strict';
import { subtotal } from '../src/carrinho.mjs';

test('soma um produto de valor inteiro', () => {
  assert.equal(subtotal([{ nome: 'Livro', preco: 100, quantidade: 1 }]), 100);
});
