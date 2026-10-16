# Soluções de referência — consultar após tentativa

Não copie todos os arquivos para a atividade. Use uma pequena alteração por
etapa e peça ao aluno que justifique. Os modelos desta branch apoiam a validação
docente; o aluno escreve a própria skill e os próprios testes.

## 01–02

O system prompt é fornecido pela plataforma. A raiz tem entradas reconhecidas
ou pontes; o tutor lê sua biblioteca por demanda. `.harness/SKILLS/` não está
configurado para descoberta automática. `.agents/skills/` é reconhecido pelo
OpenCode; fallback de leitura explícita é registrado como tal.

Veja [mini skill de referência](modelos/sabatina-requisitos/SKILL.md).
Evidência de melhora: esclarecer limite, base e casos-limite; não ativar para
revisão textual. Não alegar vantagem se o baseline já fez o mesmo.

## 03 — Regra duplicada

Em `projeto/AGENTS.md`, substituir o resumo com 20% por:

> Para regras de negócio, consulte `docs/requisitos.md`, fonte de verdade vigente.
> Não mantenha uma segunda cópia de percentuais neste guia.

Preservar a taxa do contrato. Cenário original: 80 versus 90 para 100 reais.

## 04 — Rota obsoleta

O índice corrigido deve iniciar com:

```markdown
- [Contrato vigente](requisitos.md)
- [Histórico — não usar em novas implementações](arquivo/contrato-v0.md)
```

Cenário original: rota ao v0 produz 95; rota vigente produz 90.

## 05 — Comando insuficiente

`projeto/package.json`: `test` deve executar `node --test tests/*.test.mjs`.
No guia, exigir `npm test` e análise das falhas; remover a prescrição de que
apenas smoke basta. Desconto mínimo corrigido:

```js
export function totalComDesconto(itens) {
  return Math.round(subtotal(itens) * 90) / 100;
}
```

O subtotal ainda tem um defeito numérico; não antecipar toda a solução.
Smoke inicial: 1 verde. Suíte inicial: 2 verdes, 2 vermelhos; após correção,
todos os 4 passam.

## 06 — Frete

Leia [implementação de referência](modelos/carrinho.mjs) e
[testes de frete](modelos/frete.test.mjs). Use cálculo em centavos, limiar inclusivo
de 200 reais após desconto/arredondamento, vazio sem frete e sem mutação.
O CLI deve importar checkout e mostrar seus campos. Não basta implementar uma
função não usada e declarar que a demonstração foi atualizada.

## 07 — Defeito monetário

`subtotal([{ preco: 0.1, quantidade: 1, nome: 'A' },
{ preco: 0.2, quantidade: 1, nome: 'B' }])` retorna originalmente
`0.30000000000000004`. Somar centavos inteiros retorna exatamente `0.3`.
O [teste de regressão](modelos/moeda.test.mjs) falha antes da correção e passa
depois. Mudar apenas `toFixed` do CLI não corrige a API de domínio.

Se o aluno resolver o defeito na tarefa 06, não penalize: comprove que o teste
captura a versão inicial em cópia isolada e peça a explicação da causa.
