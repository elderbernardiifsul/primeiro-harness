# Preparação e agentes no VS Code

## Preparação anterior às duas horas

Instale Git, Node.js 22+ e VS Code. Configure um dos agentes abaixo, autentique-se
e teste se ele consegue ler um arquivo e executar um comando no terminal integrado.
Não é necessário instalar pacotes npm. Abra somente a pasta deste repositório.
Escolha o melhor modelo disponível na sua conta; os nomes mudam conforme o provedor.

| Agente | Como usar nesta atividade | Entrada do projeto |
|---|---|---|
| OpenCode (referência) | Integração oficial do VS Code ou `opencode` no terminal integrado; agente Build | `AGENTS.md` |
| Copilot | Chat do VS Code em modo Agent, com ferramentas habilitadas | `.github/copilot-instructions.md` manda ler `AGENTS.md` |
| Claude Code | Extensão oficial ou `claude` no terminal integrado | `CLAUDE.md` importa `AGENTS.md` |
| Codex | Extensão oficial ou `codex` no terminal integrado | `AGENTS.md` |

Em qualquer um, abra sessão nova e envie `começar jornada 1`. A primeira pergunta
deve ser seu nome (se ainda não há memória). Se não acontecer, interrompa e peça:
“Leia ensino/TUTOR.md e siga a abertura. Não avance sem minha resposta.”

## O que significa compatibilidade

Os quatro caminhos convergem para o mesmo tutor, biblioteca e scripts Node.
O fallback portátil de uma skill é **ler explicitamente seu SKILL.md e seguir o
procedimento**. Isso não comprova descoberta ou ativação nativa da ferramenta.
Na jornada 1, a skill será criada em `.agents/skills/sabatina-requisitos/SKILL.md`,
reconhecido pelo OpenCode; em outros ambientes use o fallback quando necessário.

Depois de criar uma skill ou alterar instruções, encerre/reabra o agente,
especialmente no OpenCode, e retome pelo gatilho. A sessão antiga pode manter
contexto anterior. Um link Markdown não equivale a um import automático.

Na UI, consulte as referências/contexto disponíveis (por exemplo `/context` no
Claude Code). A declaração do modelo “li tudo” não é um log independente.
Registre versão, modelo, caminho aberto e resultado observado na evidência.

## Fontes oficiais consultadas em 2026-10-16

- [OpenCode: instruções e referências](https://opencode.ai/docs/rules/)
- [OpenCode: skills e descoberta](https://opencode.ai/docs/skills/)
- [OpenCode no IDE](https://opencode.ai/docs/ide/)
- [Copilot: instruções no IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide)
- [Claude Code: memória e imports](https://code.claude.com/docs/en/memory)
- [Codex: AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

Validação nesta entrega: scripts e rotas de entrada são verificáveis localmente.
A execução interativa real nas quatro extensões e a comparação entre modelos
devem ser registradas no piloto docente; não são garantidas por esses links.
