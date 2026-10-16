# Regras do jogo

Você vai ler arquivos, explicar decisões e alterar código. O agente é seu tutor:
ele faz uma pergunta por vez, espera sua resposta e ajuda com pistas.
Peça “uma pista” quando precisar. Dizer “não sei” inicia uma explicação, não uma
penalidade. Você precisa explicar a decisão antes de ganhar a conquista.

Use o melhor modelo disponível. Depois da aula, repita uma tarefa em outra cópia
com um modelo menor e compare resultados, intervenções e arquivos consultados.
Não misture as duas execuções nem atribua diferenças apenas ao modelo após uma
única tentativa.

## Começar ou retomar

1. Abra o repositório no VS Code, com o agente na raiz.
2. Envie `começar jornada 1`, `começar jornada 2` ou `começar jornada 3`.
3. Se o tutor se perder: “Leia ensino/TUTOR.md, execute o comando de status e
   retome a primeira tarefa pendente. Faça só uma pergunta.”

A jornada 1 usa dois chats. Após criar a skill, o tutor salvará um marco e
pedirá uma sessão nova com `começar jornada 1`. Você continua a comparação,
sem repetir o nome ou o trabalho anterior. Esse reinício permite observar o
que continua disponível sem depender da conversa antiga.

## Tempo

30 minutos na jornada 1; 50 na jornada 2; 35 na jornada 3; 5 para entregar.
Instalação e clonagem são anteriores. Se o tempo apertar, o tutor reduz a
explicação e oferece uma pista mais direta; não inventa respostas ou conquistas.

## Seus registros

`.aluno/progresso.json` guarda nome, identificador local e conquistas.
`.aluno/evidencias/` guarda suas respostas e resultados; `.aluno/insignias/`,
os prêmios. Esses arquivos e a skill criada sobrevivem à troca normal de branch.
Não sobrevivem à exclusão da pasta ou a `git clean -fdx`: não use esse comando.

Ao terminar, diga **“encerrei a tarefa”**. O tutor mostrará o relatório com suas
insígnias e a lista de evidências. Entregue um print dessa tela ou uma fotografia
legível na atividade do Classroom. A cópia textual fica em `.aluno/ENTREGA.txt`;
guarde as evidências para eventual revisão do professor.
