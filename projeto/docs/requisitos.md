# Contrato vigente do carrinho — versão 1

Este documento é a fonte de verdade do domínio. O contrato v0 está aposentado.
Alterar um roteiro de agente não autoriza alterar estas decisões de negócio.

## Itens e subtotal

Cada item possui `nome` (texto não vazio), `preco` (número positivo finito em reais,
com até duas casas decimais) e `quantidade` (inteiro positivo). Lista deve ser um
array; entradas inválidas geram erro. Não modificar o array nem seus objetos.
Valores do laboratório são pequenos; cálculos devem produzir valores monetários
de duas casas, sem resíduos de ponto flutuante observáveis na API.
`subtotal(itens)` soma preços multiplicados por quantidades; vazio retorna zero.

## Desconto

`totalComDesconto(itens)` aplica 10% ao subtotal em toda compra. Arredonde o
resultado monetário para o centavo mais próximo; meio centavo arredonda para cima.
Compra de 100 reais produz 90 reais. Vazio retorna zero.

## Funcionalidade a construir: checkout e frete

`checkout(itens)` retorna `{ subtotal, desconto, totalProdutos, frete, total }`.
`desconto` é a diferença monetária entre subtotal e totalProdutos.
Frete custa 15 reais; é gratuito quando `totalProdutos >= 200`, **depois**
do desconto e do arredondamento para centavos. Carrinho vazio tem todos os
campos zero. `total` soma totalProdutos e frete, sem resíduos numéricos.
Preserve a validação e a imutabilidade das funções anteriores.

Exemplos de preços para um item de quantidade 1:

| Preço | Total dos produtos | Frete | Total |
|---:|---:|---:|---:|
| 200,00 | 180,00 | 15,00 | 195,00 |
| 222,21 | 199,99 | 15,00 | 214,99 |
| 222,22 | 200,00 | 0,00 | 200,00 |
| 222,23 | 200,01 | 0,00 | 200,01 |

## Qualidade da entrega

Testes relevantes devem preservar os casos anteriores e cobrir fronteiras,
entradas inválidas e ausência de mutação. Exponha as funções por exports ESM.
O CLI deve demonstrar checkout quando a funcionalidade estiver pronta.
