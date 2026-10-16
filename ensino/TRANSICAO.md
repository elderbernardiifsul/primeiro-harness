# Da jornada 1 para a main

Faça esta transição **depois das conquistas 01 e 02**, antes de abrir a sessão da J2.

1. Execute `node scripts/lab.mjs status` e `node scripts/lab.mjs encerrar 1`.
   Se faltar uma conquista ou evidência, conclua primeiro a jornada 1. Não troque
   de branch nem inicie a jornada 2 para contornar a pendência.
2. A skill criada está em `.agents/skills/sabatina-requisitos/`; ela e `.aluno/`
   são ignoradas nas duas branches e permanecerão no diretório. Não as remova.
3. Se houver alterações versionadas, revise e faça um commit pessoal somente dos
   arquivos desejados antes de trocar. Se houver outros arquivos não rastreados,
   preserve-os e verifique conflitos. Não use reset/checkout forçado ou clean.
4. Depois da verificação, se o aluno aceitar preparar a próxima jornada, execute:

   ```sh
   node scripts/lab.mjs preparar 2 --trocar-branch
   ```

   O comando verifica a sequência, as evidências e o estado Git antes de trocar
   de branch, e confere a preservação da memória depois. O Git normalmente cria
   a branch local acompanhando `origin/main`. Se não
   encontrar a referência, execute `git fetch origin` e tente novamente. O clone
   inicial não deve usar `--single-branch` nem `--depth`.
5. Confira `git branch --show-current` e `node scripts/lab.mjs status`.
   As duas conquistas e seu nome precisam continuar presentes.
6. Pare na confirmação da transição. Encerre a sessão do agente, abra uma nova na
   raiz e envie `começar jornada 2`. O tutor executará `preparar 2` novamente antes
   de ler o roteiro. Um “sim” para prosseguir não autoriza pular essas verificações.

## Da jornada 2 para a jornada 3

Execute `node scripts/lab.mjs encerrar 2`. Se aprovado e o aluno aceitar,
execute `node scripts/lab.mjs preparar 3 --trocar-branch`. Mesmo que já esteja
na main, pare e oriente uma nova sessão com `começar jornada 3`. Se faltarem
conquistas, retome primeiro a jornada indicada; não avance por confirmação verbal.

Para experimentar outro modelo posteriormente, use outro clone e refaça o mesmo
cenário inicial. Não sobrescreva a atividade concluída.
