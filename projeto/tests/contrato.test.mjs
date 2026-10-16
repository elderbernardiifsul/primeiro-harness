import test from 'node:test';
import assert from 'node:assert/strict';
import { subtotal, totalComDesconto } from '../src/carrinho.mjs';

test('desconto segue o contrato vigente', () => {
  assert.equal(totalComDesconto([{ nome: 'Livro', preco: 100, quantidade: 1 }]), 90);
  assert.equal(totalComDesconto([{ nome: 'Caderno', preco: 20, quantidade: 3 }]), 54);
});

test('vazio retorna zero e o cálculo não altera entradas', () => {
  assert.equal(subtotal([]), 0);
  assert.equal(totalComDesconto([]), 0);
  const itens = [{ nome: 'Livro', preco: 100, quantidade: 2 }];
  const copia = structuredClone(itens);
  assert.equal(totalComDesconto(itens), 180);
  assert.deepEqual(itens, copia);
});

test('rejeita entradas inválidas', () => {
  for (const itens of [null, {}, [{ nome: '', preco: 10, quantidade: 1 }],
    [{ nome: 'A', preco: NaN, quantidade: 1 }], [{ nome: 'A', preco: Infinity, quantidade: 1 }],
    [{ nome: 'A', preco: -1, quantidade: 1 }], [{ nome: 'A', preco: 1.001, quantidade: 1 }],
    [{ nome: 'A', preco: 10, quantidade: 0 }], [{ nome: 'A', preco: 10, quantidade: 1.5 }]]) {
    assert.throws(() => subtotal(itens));
    assert.throws(() => totalComDesconto(itens));
  }
});
