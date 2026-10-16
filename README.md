# Primeiro harness: do contexto à evidência

Laboratório de Programação Agêntica - Harness. **120 minutos de
atividade programada**.

A atividade consiste em um "passeio guiado" pelo harness que trabalhamos inicialmente em aula, alguns exemplos de patterns e anti-patterns de harness e apoio para compreensao e evidências de como as instruções para a IA importam.

Você vai passar por "jornadas" e em cada uma delas vai ganhar um badge para comprovar sua execução. Importante respeitar a ordem e seguir o que o agente está lhe guiando. Procure usar o melhor modelo que tem à disposição e tratar o agente como um tutor e não como alguém que vá fazer por ti. Ele está treinado para ser seu guia, não seu trabalhador.

Uma boa jornada e qualquer problema ou dúvida, entre em contato.

## Setup inicial

1. Requisitos: Git, Node.js 22+ e VS Code (ou similar). Confira `git --version` e `node --version`.
2. Configure e autentique um agente no VS Code. Use o melhor modelo disponível. Atividade testada no Opencode, mas compatível com outros.

3. No terminal: clone a branch inicial:

   ```sh
   git clone --branch jornada-1 https://github.com/elderbernardiifsul/primeiro-harness.git primeiro-harness
   ```

4. Abra **a pasta clonada**, não sua pasta-pai: `code primeiro-harness`.
5. Caso tenha clonado o repositorio sem o '--branch', troque para branch jornada-1 ou peça para o agente fazer.
5. No terminal integrado, execute `npm test` e `npm run verificar`.
6. No chat do agente, em modo com leitura, edição e terminal, envie:

> Sugiro abrir no terminal do vscode ou no chat via extensão.

   ```text
   começar jornada 1
   ```

O tutor perguntará seu nome. Responda com o nome que deseja nas insígnias.

Depois de terminar a primeira, siga a transição abaixo. Feita a transição, "começar jornada 2"; e assim por diante.

## Percurso

| Jornada | Tempo | Gatilho em sessão nova |
|---|---:|---|
| Conhecer e construir | 30 min | `começar jornada 1` |
| Investigar e recuperar | 50 min | `começar jornada 2` |
| Desenvolver e depurar | 35 min | `começar jornada 3` |
| Premiação e entrega | 5 min | `minhas insígnias` |

Ao concluir a primeira jornada, siga [a transição de branch](ensino/TRANSICAO.md).
. Esta etapa é fundamental, pois o código que precisamos está na branch main. Abra uma sessão nova no agente para cada uma das demais jornadas. O tutor retomará seu progresso local.
Se ele não reconhecer o gatilho, envie: **“Leia AGENTS.md e ensino/TUTOR.md;
comece a jornada N e aguarde minha resposta a cada pergunta.”**

No Mapa rápido, há links para materiais para leitura, que a jornada usará para lhe guiar, que podem ser lidos. Foram feitos para isso.

## Entrega

Ao ganhar cada prêmio, faça um print do troféu no terminal ou no chat. No final,
execute `node scripts/lab.mjs painel`, abra `.aluno/insignias/PAINEL.txt` e
envie o print final para a atividade no classroom, junto com
`.aluno/evidencias/`: o prêmio resume evidências, não as substitui.

## Mapa rápido

- [Início e regras do jogo](ensino/INICIO.md)
- [Conhecimento: fundamentos, patterns e antipatterns](ensino/conhecimento/INDEX.md)
- [Compatibilidade e fontes oficiais](ensino/AMBIENTE.md)
- [Conquistas e registro](ensino/CONQUISTAS.md)
- [Validações executadas e limites](ensino/VALIDACAO.md)
- [Documentação original](docs/INDEX.md)

A tag `base-original` preserva o laboratório anterior; `jornada-1` contém o
passeio inicial; `main`, o software defeituoso; `professor`, o guia docente.
Repositório público: https://github.com/elderbernardiifsul/primeiro-harness.
As três branches e a tag estão disponíveis para clonagem.
