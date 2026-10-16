# Entregar e depurar com evidência

## Entrega profissional em projeto pequeno

Leia o contrato; esclareça ambiguidades; escreva critérios; faça a menor mudança;
verifique limites e entradas inválidas; revise o diff; comunique o resultado.
Profissionalismo não exige frameworks ou muitas camadas.

Na main, a função `checkout` deve ganhar frete de 15 reais ou frete grátis a
partir de 200 reais **após o desconto**. Essa decisão evita confundir subtotal
e total. A mini skill ajuda a esclarecer limite inclusivo, carrinho vazio e
entradas inválidas antes de implementar.

## Depuração

Observe uma entrada que falha → preveja resultado → reproduza → formule hipótese
→ confirme no código → escreva teste de regressão → corrija → rode a suíte.
Não altere a expectativa só para fazer o teste passar.

Valores monetários em ponto flutuante podem exibir `0.30000000000000004`.
Defina onde arredondar e use centavos inteiros no cálculo, respeitando o contrato.
Em particular, 0,10 + 0,20 deve resultar em exatamente 0,30, não apenas parecer
correto em uma string formatada com duas casas.

**Pergunta:** qual diferença existe entre esconder um erro na apresentação e
corrigir a representação usada pelo domínio?

**Evidência:** entrada mínima, valor esperado/obtido, teste que falha antes e
passa depois, além da suíte anterior preservada.
