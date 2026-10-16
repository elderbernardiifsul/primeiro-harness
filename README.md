# Primeiro harness: do contexto à evidência

Laboratório do professor Élder para formandos em Computação. **120 minutos de
atividade**, além da preparação. JavaScript, Node.js 22+, sem `npm install`.

## Antes da aula

1. Instale Git, Node.js 22+ e VS Code. Confira `git --version` e `node --version`.
2. Configure e autentique um agente no VS Code. Use o melhor modelo disponível.
   Veja [como abrir seu agente](ensino/AMBIENTE.md).
3. Clone a branch inicial:

   ```sh
   git clone --branch jornada-1 https://github.com/elderbernardiifsul/primeiro-harness.git primeiro-harness
   ```

4. Abra **a pasta clonada**, não sua pasta-pai: `code primeiro-harness`.
5. No terminal integrado, execute `npm test` e `npm run verificar`.
6. No chat do agente, em modo com leitura, edição e terminal, envie:

   ```text
   começar jornada 1
   ```

O tutor perguntará seu nome. Responda com o nome que deseja nas insígnias.
Ele ficará somente em `.aluno/`, ignorado pelo Git.

## Percurso

| Jornada | Tempo | Gatilho em sessão nova |
|---|---:|---|
| Conhecer e construir | 30 min | `começar jornada 1` |
| Investigar e recuperar | 50 min | `começar jornada 2` |
| Desenvolver e depurar | 35 min | `começar jornada 3` |
| Premiação e entrega | 5 min | `minhas insígnias` |

Ao concluir a primeira jornada, siga [a transição de branch](ensino/TRANSICAO.md).
Abra uma sessão nova nas demais jornadas. O tutor retomará seu progresso local.
Se ele não reconhecer o gatilho, envie: **“Leia AGENTS.md e ensino/TUTOR.md;
comece a jornada N e aguarde minha resposta a cada pergunta.”**

## Entrega

Ao ganhar cada prêmio, faça um print do troféu no terminal ou no chat. No final,
execute `node scripts/lab.mjs painel`, abra `.aluno/insignias/PAINEL.txt` e
envie o print final conforme a orientação do professor. Preserve também
`.aluno/evidencias/`: o prêmio resume evidências, não as substitui.
Para compartilhar o código, revise `git diff`; não versione `.aluno/`.

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
