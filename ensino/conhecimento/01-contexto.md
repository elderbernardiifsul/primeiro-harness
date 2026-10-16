# Harness e contexto: arquivo não é carregamento

## Conceito

O harness organiza contexto, ferramentas, procedimentos e verificações ao redor
do modelo. O modelo gera ações e respostas; o runtime determina quais ferramentas
e instruções lhe são disponibilizadas. Um Markdown influencia decisões, mas não
é um bloqueio técnico de execução.

System prompt é fornecido pela plataforma/runtime e orienta o comportamento
global. `AGENTS.md` não substitui esse nível. Não é necessário nem correto
inventar o texto privado do sistema para explicar a hierarquia. Instruções do
projeto, pedidos do aluno e dados lidos têm papéis diferentes; os detalhes de
precedência e descoberta dependem da ferramenta.

## Abra e observe

- [Entrada local](../../AGENTS.md), seção “Entrada da atividade”.
- [Ponte Claude](../../CLAUDE.md), import `@AGENTS.md`.
- [Ponte Copilot](../../.github/copilot-instructions.md), leitura explícita.
- [Skill antiga](../../.harness/SKILLS/cobase-search/SKILL.md), frontmatter.
- [Memória institucional](../../.harness/MEMORY.md), decisões de manutenção.

Um arquivo em `.harness/SKILLS/` não é automaticamente descoberto só por ter
`SKILL.md`. Nesta atividade, sua leitura precisa ser explícita: não há
configuração registrando esse diretório. Compare com os caminhos oficiais em
[Ambiente](../AMBIENTE.md). A memória do aluno também só chega ao contexto quando
o tutor executa status ou lê o arquivo.

## Pattern e antipattern

**Antipattern:** afirmar “o agente lê tudo no repositório”. Isso confunde
existência, descoberta, carregamento e execução.

**Pattern:** manter uma entrada pequena, apontar fontes e registrar o que foi
realmente consultado. Configurar o runtime quando o mecanismo exigir isso.

**Pergunta:** quais arquivos chegaram por mecanismo da ferramenta e quais
precisaram de leitura explícita nesta sessão? O que ainda não sabemos?

**Evidência:** mapa de três arquivos com caminho, mecanismo e observação. Admitir
“não confirmado” é melhor do que atribuir ao modelo um contexto não observado.
