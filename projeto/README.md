# Carrinho do laboratório

Pequena biblioteca de carrinho com demonstração no terminal. Sem pacotes externos.
Execute os comandos a partir da raiz do laboratório:

```sh
npm --prefix projeto start
npm --prefix projeto test
npm --prefix projeto run test:completo
```

Ou rode `npm start`/`npm test` no terminal aberto em `projeto/`.
Os comandos `npm test` da raiz e do projeto têm papéis diferentes:
o primeiro verifica a infraestrutura didática; o segundo verifica o carrinho.

O harness contém defeitos intencionais. Não presuma que smoke verde significa
produto correto. A jornada 2 conduz a investigação e as correções.

- [Orientações operacionais](AGENTS.md)
- [Índice de negócio](docs/INDEX.md)
- [Contrato vigente para conferência](docs/requisitos.md)
- [Código do domínio](src/carrinho.mjs)

Na jornada 3 serão acrescentados checkout/frete e um teste monetário de regressão.
