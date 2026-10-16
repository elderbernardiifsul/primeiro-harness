# Validação da construção

Data: 2026-10-16. Runtime executado: Node.js v26.11.1; requisito mínimo declarado:
Node.js 22+. Não foram instaladas dependências.

## O que foi executado

- Testes da infraestrutura: nome, memória não sobrescrita, pré-requisitos,
  evidência obrigatória, selo estável, painel e retomada.
- Checagem dos links Markdown locais e entradas dos agentes.
- Estado inicial do produto: smoke verde, suíte completa vermelha por desconto.
- Cenários documentais: resumo produz 80, contrato 90, rota obsoleta 95.
- Cenário numérico: subtotal de 0,10 e 0,20 produz resíduo binário na versão inicial.
- Validador docente em clone isolado: jornada 1, troca real para main, skill e
  progresso preservados, guia acessado por origin/professor sem checkout.
- Correções graduais de referência, frete, regressão monetária, sete troféus,
  master, reimpressão e bloqueio após evidência alterada ou regressão técnica.

O validador está na branch professor. O tutor pode consultar seus registros por
`node scripts/professor.mjs guia`, sem substituir o código do aluno pelo gabarito.

## Limites conhecidos

Essas são verificações de software e revisão de instruções, não um ensaio real
com alunos. As quatro integrações no VS Code, os cliques nos links, a comparação
entre modelos e a duração de 120 minutos precisam de piloto docente.
Não foi executada uma matriz de versões Node.js; a execução registrada foi na
versão acima. Os mecanismos portáveis evitam dependências, symlinks e shell Unix
nos scripts da atividade.

Modelos não obedecem infalivelmente a Markdown. O desenho combina roteiro curto,
estado local, pré-requisitos, verificações e intervenção pedagógica. Insígnias
atestam marcos registrados; não são certificados antifraude.

## Correções após o piloto automatizado — 2026-10-16

Aplicação local no clone original, em `main`, com Node.js v22.23.2. Preservadas
as alterações locais anteriores e todos os arquivos de `projeto/`.

- Removida a rejeição por palavras soltas na conquista 05: frases como “o smoke
  isolado não é suficiente” deixam de gerar falso positivo. Permanecem o comando
  `npm test` documentado, o script de suíte completa e a execução real sem falhas,
  além das verificações anteriores de contrato e índice. A coerência da redação
  do guia continua sob avaliação do tutor, não de um analisador semântico.
  Uma checagem literal continua bloqueando o parágrafo defeituoso original
  quando ele permanece intocado, inclusive com quebras de linha diferentes.
- O subprocesso de testes não herda `NODE_TEST_CONTEXT`: quando chamado de outro
  teste Node, ele executa a suíte em vez de pular os arquivos e retornar sucesso.
- Onze regressões novas: cinco redações válidas, comando parcial, guia sem comando,
  falha fora do smoke, bloqueios de contrato/índice e duas variantes do parágrafo
  defeituoso original. Os dois últimos casos vieram da revisão independente.
- `npm test`: 20 testes aprovados. `npm run verificar`, `npm run verificar:harness`
  sem referências e `git diff --check` aprovados.
- `pistas`, `solucoes` e `guia` do script docente retornaram zero via
  `origin/professor`, sem checkout. Uma seção inválida retornou erro.
- A suíte smoke do produto continua verde; a completa continua vermelha por
  dois casos do desconto intencionalmente defeituoso. Não são regressões da
  infraestrutura e não foram corrigidos nesta manutenção.
- O protocolo agora explicita fim de turno após a pergunta, tratamento de resposta
  contaminada, limite de feedback, pausas, captura do código de saída e reinício
  interno da J1. A documentação distingue o fallback de descoberta nativa antes
  de criar a skill e informa limites de consumo e duração.

As mudanças estão na árvore de trabalho: não houve commit, sincronização de refs
entre branches ou publicação. A comparação com `main` e `origin/jornada-1`
aponta divergências esperadas; não é uma aprovação de igualdade entre branches.
Um novo piloto deve verificar a adesão do tutor às instruções revisadas. Esta
manutenção não repete as três jornadas nem valida aprendizagem humana ou
descoberta nativa no Claude Code. Os logs e o snapshot anterior ficam no audit dir
do piloto, em `correcoes-original/`, sem alterar as evidências históricas.
