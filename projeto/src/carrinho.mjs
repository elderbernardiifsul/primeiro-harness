function validar(itens) {
  if (!Array.isArray(itens)) throw new TypeError('Itens deve ser um array.');
  for (const item of itens) {
    if (!item || typeof item.nome !== 'string' || !item.nome.trim()) {
      throw new TypeError('Nome deve ser um texto não vazio.');
    }
    if (!Number.isFinite(item.preco) || item.preco <= 0 ||
        Math.abs(item.preco * 100 - Math.round(item.preco * 100)) > 1e-7) {
      throw new TypeError('Preço deve ser positivo e possuir até duas casas.');
    }
    if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      throw new TypeError('Quantidade deve ser um inteiro positivo.');
    }
  }
}

export function subtotal(itens) {
  validar(itens);
  return itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

export function totalComDesconto(itens) {
  return subtotal(itens) * 0.8;
}
