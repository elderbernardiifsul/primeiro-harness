======================
Data: 2026-10-09
Prompt: Avaliar o AGENTS.md com protocolo GEPA, sugerir melhorias e adequar a melhores práticas.
Resultado: Reestruturadas as diretrizes locais, corrigidos caminhos e regras absolutas, e incluídos fluxo de execução, verificação, documentação, changelog e memória.
Arquivos: AGENTS.md, .harness/CHANGELOG.md, .harness/MEMORY.md
Verificação: Revisão estrutural, checagem de referências e validação de Markdown por inspeção.
Autor: Codex

======================
Data: 2026-10-16
Prompt: Corrigir avanço entre jornadas para verificar conclusão, sequência e branch, trocar a branch correta e orientar nova sessão.
Resultado: Adicionados comandos preparar/encerrar com comprovantes e hashes, gate de sequência, validação de branch/estrutura e troca segura sem descartar alterações. Tutor aplica o gate também após sim/continue, encerra antes de convidar para a próxima e para após preparar a branch. Preservada a substituição anterior do README.
Arquivos: AGENTS.md, ensino/TUTOR.md, ensino/TRANSICAO.md, ensino/CONQUISTAS.md, ensino/jornadas/01.md, ensino/jornadas/02.md, ensino/jornadas/03.md, scripts/lab.mjs, scripts/jornadas.mjs, tests/jornadas.test.mjs, .harness/MEMORY.md, .harness/CHANGELOG.md.
Verificação: npm test aprovado (7 testes), incluindo Git temporário para sequência incompleta, ausência de memória, evidência alterada, transição real, main só remota, referências da branch anterior, preservação de memória/skill, branch docente/pessoal e bloqueio de alterações locais; npm run verificar e git diff --check aprovados. Comportamento interativo depende de piloto no agente.
Autor: OpenCode

======================
Data: 2026-10-16
Prompt: Substituir o README pelo texto fornecido pelo professor.
Resultado: README substituído conforme o conteúdo solicitado, incluindo apresentação, setup, retomada, transição de branch e entrega no Classroom.
Arquivos: README.md, .harness/CHANGELOG.md.
Verificação: Checagem de links locais com npm run verificar e git diff --check.
Autor: OpenCode

======================
Data: 2026-10-16
Prompt: Registrar as alterações locais do README nas branches jornada-1 e main e fazer push de ambas.
Resultado: Atualizadas apresentação, preparação e orientações de percurso e entrega do laboratório; removidos dois espaços finais do texto fornecido.
Arquivos: README.md, .harness/CHANGELOG.md.
Verificação: git diff --check e npm run verificar em ambas as branches; conferência de igualdade do README entre as branches.
Autor: OpenCode

======================
Data: 2026-10-16
Prompt: Criar e publicar o repositório no GitHub, com visibilidade pública confirmada.
Resultado: Criado elderbernardiifsul/primeiro-harness; configurado origin e atualizado o roteiro com a URL definitiva. Publicação inclui main, jornada-1, professor e base-original.
Arquivos: README.md, .harness/CHANGELOG.md; configuração local do remoto Git.
Verificação: Conta autenticada e estado Git inspecionados; referências remotas e visibilidade conferidas após o envio.
Autor: OpenCode

======================
Data: 2026-10-16
Prompt: Construir laboratório guiado de duas horas, com jornadas, compatibilidade entre agentes, memória local e insígnias ASCII personalizadas.
Resultado: Preservada base-original em Git independente; adicionados tutor socrático, biblioteca sob demanda, jornada 1, entradas portáveis, roteiro de clonagem/transição e emissor de troféus com evidências. Nome não é registrado em arquivos institucionais. Diretório ignorado no Git pai por autorização do professor.
Arquivos: AGENTS.md, CLAUDE.md, .github/copilot-instructions.md, .gitignore, package.json, README.md, ensino/, scripts/, tests/, docs/INDEX.md, .harness/MEMORY.md, .harness/CHANGELOG.md; ../.gitignore.
Verificação: npm test aprovado (memória, ordem, evidência, selos, retomada); npm run verificar aprovado (30 arquivos); git diff --check aprovado; fontes oficiais de carregamento consultadas. Compatibilidade das extensões e duração em sala exigem piloto real.
Autor: OpenCode

======================
Data: 2026-10-16
Prompt: Verificar a construção completa e reforçar evidências para a premiação.
Resultado: Clone temporário percorreu J1, transição, referências docentes, recuperação, funcionalidade, regressão e master; identidade e skill preservadas. Aceitação confere os cinco campos de checkout e execução do CLI em JSON; checador de links ignora exemplos em código. Relatório separa testes reais de piloto pedagógico pendente.
Arquivos: scripts/verificacoes.mjs, scripts/verificar-repo.mjs, ensino/CONQUISTAS.md, ensino/VALIDACAO.md, ensino/jornadas/03.md, README.md, .harness/CHANGELOG.md.
Verificação: Validador docente completo e reforços aprovados em clone isolado: transição real, guia via origin/professor, sete prêmios e master, gates negativos e bloqueio de regressão/evidência alterada. npm test, npm run verificar e git diff --check aprovados nas branches pertinentes. Node.js v26.11.1. Sem execução real das quatro integrações VS Code e sem piloto de duração.
Autor: OpenCode

======================
Data: 2026-10-16
Prompt: Entregar projeto JavaScript com harness defeituoso, evidências reproduzíveis e recuperação socrática, seguido de funcionalidade e bug.
Resultado: Main recebe carrinho CLI sem dependências, contrato vigente e histórico, três antipatterns semeados, reprodutores de consequências e jornadas 2–3. Suíte do produto falha intencionalmente no desconto; smoke passa. Frete ausente e defeito de subtotal monetário reservados à jornada final.
Arquivos: projeto/, scripts/cenarios.mjs, ensino/jornadas/02.md, ensino/jornadas/03.md, .harness/CHANGELOG.md.
Verificação: npm test da raiz e npm run verificar aprovados (44 arquivos); smoke do produto verde; suíte completa do produto falha intencionalmente (80/90 e 160/180); cenários confirmam resumo 80 versus contrato 90, rota antiga 95 versus 90 e subtotal 0.30000000000000004 versus 0.3; git diff --check aprovado. Fluxo corrigido será validado em cópia isolada na branch professor. Não houve piloto real nas extensões.
Autor: OpenCode
======================
Data: 2026-10-09
Prompt: Aprimorar a skill de busca em docs para incorporar conhecimento da web, mantendo documentos sem alterações sem ordem explícita, exceto informações da stack obtidas em documentação oficial e validadas na prática, em diretório dedicado.
Resultado: A skill cobase-search permite notas em docs/tech-stack/ somente com adoção local comprovada, fonte oficial aplicável à versão e verificação prática pertinente. Exige fonte, datas, procedimento, resultado e limites; preserva demais documentos e respeita proibição de escrita. Ajustadas as diretrizes locais e registrada a decisão durável. Diretório dedicado previsto, sem criação de notas vazias ou atribuição de stack inexistente.
Arquivos: .harness/SKILLS/cobase-search/SKILL.md, AGENTS.md, .harness/MEMORY.md, .harness/CHANGELOG.md
Verificação: Validador quick_validate.py aprovado; comparação com versão anterior; avaliação independente simulada de 10 cenários, incluindo casos sem escrita, versão divergente, falta de validação e índice ausente; checagem de links locais, espaços finais e formato da memória. Corrigido critério do changelog para consultas sem alterações. Sem navegação ou testes reais de tecnologias nesta tarefa.
Autor: Codex
