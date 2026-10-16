# Da jornada 1 para a main

Faça esta transição **depois das conquistas 01 e 02**, antes de abrir a sessão da J2.

1. Execute `node scripts/lab.mjs status` e `git status --short`.
2. A skill criada está em `.agents/skills/sabatina-requisitos/`; ela e `.aluno/`
   são ignoradas nas duas branches e permanecerão no diretório. Não as remova.
3. Se houver alterações versionadas, revise e faça um commit pessoal somente dos
   arquivos desejados antes de trocar. Se houver outros arquivos não rastreados,
   preserve-os e verifique conflitos. Não use reset/checkout forçado ou clean.
4. No clone normal, a `main` pode existir só como referência remota. Execute:

   ```sh
   git switch main
   ```

   O Git normalmente cria a branch local acompanhando `origin/main`. Se não
   encontrar a referência, execute `git fetch origin` e tente novamente. O clone
   inicial não deve usar `--single-branch` nem `--depth`.
5. Confira `git branch --show-current` e `node scripts/lab.mjs status`.
   As duas conquistas e seu nome precisam continuar presentes.
6. Encerre a sessão do agente, abra uma nova na raiz e envie `começar jornada 2`.

Para experimentar outro modelo posteriormente, use outro clone e refaça o mesmo
cenário inicial. Não sobrescreva a atividade concluída.
