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

function subtotalCentavos(itens) {
  validar(itens);
  return itens.reduce((soma, item) => soma + Math.round(item.preco * 100) * item.quantidade, 0);
}

export function subtotal(itens) {
  return subtotalCentavos(itens) / 100;
}

export function totalComDesconto(itens) {
  return Math.round(subtotalCentavos(itens) * 90 / 100) / 100;
}

export function checkout(itens) {
  const bruto = subtotalCentavos(itens);
  const produtos = Math.round(bruto * 90 / 100);
  const frete = bruto === 0 || produtos >= 20000 ? 0 : 1500;
  return {
    subtotal: bruto / 100,
    desconto: (bruto - produtos) / 100,
    totalProdutos: produtos / 100,
    frete: frete / 100,
    total: (produtos + frete) / 100,
  };
}
