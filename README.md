# Primeiro harness: do contexto à evidência

Laboratório de Programação Agêntica - Harness. **120 minutos de
atividade programada**.

A atividade consiste em um "passeio guiado" pelo harness que trabalhamos inicialmente em aula, alguns exemplos de patterns e anti-patterns de harness e apoio para compreensao e evidências de como as instruções para a IA importam.

Você vai passar por "jornadas" e em cada uma delas vai ganhar um badge para comprovar sua execução. Importante respeitar a ordem e seguir o que o agente está lhe guiando. Procure usar o melhor modelo que tem à disposição e tratar o agente como um tutor e não como alguém que vá fazer por ti. Ele está treinado para ser seu guia, não seu trabalhador.

> Atenção: depois de terminar a jornada 1, você precisa alterar a branch para `main` para que o agente possa acessar o código que precisa. Siga as instruções do tutor para fazer a transição. Esse código é uma aplicação bastante simples, mas com problemas de execução que você vai investigar e corrigir. O tutor vai te guiar para isso.
> se o agente parar de responder, um simples "continue" ou "continue a jornada" deve ser suficiente para retomar. Se não, abra uma nova sessão e diga: "Leia AGENTS.md e ensino/TUTOR.md; comece a jornada N e aguarde minha resposta a cada pergunta."

Uma boa jornada e qualquer problema ou dúvida, entre em contato.

## Setup inicial

1. Requisitos: Git, Node.js 22+ e VS Code (ou similar). Confira `git --version` e `node --version`.
2. Configure e autentique um agente no VS Code. Use o melhor modelo disponível. Atividade testada no Opencode, mas compatível com outros.

3. No terminal: clone a branch inicial:

   ```sh
   git clone --branch jornada-1 https://github.com/elderbernardiifsul/primeiro-harness.git primeiro-harness
   ```

4. Abra **a pasta clonada**, não sua pasta-pai: `code primeiro-harness`.
5. Caso tenha clonado sem `--branch`, você estará em `main`. O harness também
   funciona nela: ao pedir a jornada 1, o tutor verificará a branch e orientará a
   troca segura para `jornada-1`, seguida de nova sessão. Para trocar antes de
   abrir o agente, use `git switch jornada-1` com a árvore de trabalho limpa.
6. No terminal integrado, execute `npm test` e `npm run verificar`.
7. No chat do agente, em modo com leitura, edição e terminal, envie:

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
Esta etapa é fundamental, pois o código que precisamos está na branch `main`.
As jornadas 2 e 3 usam `main`; não exigem branches `jornada-2` ou `jornada-3`.
Abra uma sessão nova no agente para cada jornada e depois de trocar de branch.
O tutor relerá as instruções atuais e retomará seu progresso local.
Se ele não reconhecer o gatilho, envie: **“Leia AGENTS.md e ensino/TUTOR.md;
comece a jornada N e aguarde minha resposta a cada pergunta.”**

No Mapa rápido, há links para materiais para leitura, que a jornada usará para lhe guiar, que podem ser lidos. Foram feitos para isso.

## O harness em cada branch

O mesmo contrato do tutor acompanha `main`, `jornada-1` e as branches pessoais
compatíveis. Muda o material da etapa: a primeira branch tem o passeio inicial;
`main` acrescenta o software que vamos investigar. As regras de tutoria continuam
na raiz, mesmo quando o agente trabalha em `projeto/`.

O ponto de entrada é [AGENTS.md](AGENTS.md), que encaminha a atividade ao
[tutor central](ensino/TUTOR.md). Claude Code e Copilot têm entradas próprias
que apontam para esse contrato. Uma referência a um arquivo não prova sua leitura.
Se o agente ignorar as regras, interrompa e envie, substituindo N pela jornada:

```text
Leia AGENTS.md e ensino/TUTOR.md da branch atual com ferramentas de leitura.
Confira a branch e meu progresso local. Prepare a jornada N pelo script antes
de iniciar; se trocar de branch, pare e peça nova sessão. Faça uma pergunta
por vez e aguarde minha resposta. Não resolva a atividade por mim.
```

Para quem mantém o laboratório: depois de registrar uma mudança do núcleo comum
nas duas branches locais, confira se continuam iguais:

```sh
npm run verificar:harness -- main jornada-1
```

Sem argumentos, esse comando verifica presença e referências das entradas na
cópia atual. Com referências Git, compara o núcleo comum com cada uma delas,
sem trocar de branch nem copiar o software. Para verificar o que foi buscado do
remoto, use `origin/main origin/jornada-1` após atualizar as referências.
A checagem não garante que um modelo cumpra as instruções; isso exige observar
a tutoria, como descrito em [Ambiente](ensino/AMBIENTE.md).

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
