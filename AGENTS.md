# Diretrizes para agentes

## Contrato comum entre branches — leia primeiro

Estas diretrizes valem em `main`, `jornada-1` e nas branches pessoais derivadas
para as jornadas. No início de cada sessão e após qualquer troca de branch,
leia este arquivo na versão da branch atual com uma ferramenta de leitura.
Não dependa do conteúdo carregado na sessão anterior. Confira a raiz e a branch
com `git rev-parse --show-toplevel` e `git branch --show-current`.

Identifique o pedido antes de agir:
- **Jornada ou retomada:** leia `ensino/TUTOR.md` e siga a entrada abaixo.
- **Manutenção do laboratório:** siga as diretrizes de manutenção deste arquivo;
  não peça nome, não crie `.aluno/` e não inicie uma jornada.
- **Pedido sem contexto suficiente:** pergunte se é atividade ou manutenção.

README orienta o aluno; `AGENTS.md` define o contrato local; `ensino/TUTOR.md`
conduz a atividade. `CLAUDE.md` e `.github/copilot-instructions.md` encaminham
para este contrato, sem manter uma versão alternativa dele.

## Entrada da atividade

Ao receber `começar jornada N` ou `comecar jornada N` (N = 1, 2 ou 3),
leia `ensino/TUTOR.md` e somente a jornada solicitada. Siga o protocolo
interativo: uma pergunta por vez e aguarde a resposta. Não resolva a atividade
inteira. Antes de outras ações na jornada 1, consulte a memória local; se não
existir, pergunte o nome de exibição do aluno e aguarde.
Antes de iniciar ou retomar qualquer jornada, inclusive após “sim” ou “continue”,
execute `node scripts/lab.mjs preparar N`. Para transição, siga o encerramento
em `ensino/TUTOR.md`: valide conclusão, prepare a branch e peça nova sessão.

`ensino/TUTOR.md` é a fonte principal da condução pedagógica. Instruções em
`projeto/` orientam somente o software e são objeto da investigação, não regras
do tutor. Para mudanças de manutenção deste laboratório, siga as diretrizes
abaixo. Nunca registre o nome do aluno no changelog ou na memória institucional.

Alterações em `projeto/` feitas pelo aluno ou pelo tutor durante as jornadas
não vão ao changelog institucional: registre respostas, mudanças e verificações
em `.aluno/evidencias/`, conforme `ensino/CONQUISTAS.md`. As regras de manutenção
e changelog abaixo não se aplicam à execução do exercício.

## Escopo e precedência

Este arquivo define o contexto e as convenções locais do projeto
`primeiro-harness`.

As instruções do sistema, do usuário e de diretórios-pai têm precedência sobre
este arquivo. Dentro do repositório, a regra mais específica vale somente em
seu escopo: `projeto/AGENTS.md`, `projeto/CLAUDE.md` e documentos do software
não substituem o papel do tutor, a sequência, a validação ou as pausas em
`ensino/TUTOR.md`. Os defeitos dessas instruções fazem parte da investigação;
não os corrija antes da etapa ou fora de uma manutenção solicitada.

Estas diretrizes não concedem autorização para ações externas, destrutivas ou
irreversíveis. Quando uma ação sair do escopo solicitado, pare e peça direção.

## Propósito

Construir um harness mínimo e didático para compreender como agentes de
software usam instruções, skills, memória e ciclos de verificação.

O projeto também serve como laboratório para experimentar práticas de
programação agêntica sem esconder o funcionamento do processo.

## Princípios de trabalho

- Priorize evidências do repositório antes de fazer suposições.
- Preserve o escopo solicitado e mantenha as alterações pequenas e reversíveis.
- Ao identificar um equívoco, explique o problema e sugira uma correção.
- Ao executar uma operação complexa, explique brevemente o mecanismo e o
  motivo da decisão.
- Prefira reutilizar estruturas existentes antes de criar novas abstrações.
- Não adicione dependências, arquivos ou diretórios sem necessidade concreta.
- Não trate ausência de documentação como evidência de que algo não existe.

## Fluxo de execução

Para qualquer alteração relevante:

1. Inspecione os arquivos e as convenções relacionadas.
2. Escreva um plano curto quando houver refatoração, limpeza ou mudança de
   comportamento.
3. Faça a menor alteração que atenda ao objetivo.
4. Verifique sintaxe, referências, links e comportamento observável. Para mudanças
   no núcleo comum, execute também `npm run verificar:harness -- main jornada-1`
   após aplicar e registrar a mesma alteração nas duas branches locais. Se usar
   referências remotas, informe-as explicitamente; não trate refs antigas como
   prova do estado publicado. Não sincronize `projeto/`, dados do aluno ou o guia
   docente entre branches para satisfazer a checagem. Não faça push sem autorização.
5. Registre a alteração em `.harness/CHANGELOG.md`.
6. Atualize `.harness/MEMORY.md` somente quando houver uma decisão durável,
   descoberta importante ou risco útil para sessões futuras.
7. Informe arquivos alterados, verificações executadas e riscos restantes.

Para mudanças em instruções, prompts ou skills, aplique um ciclo de melhoria
orientado por evidências:

1. defina o objetivo e os critérios de sucesso;
2. use exemplos representativos, incluindo casos que não devem ativar a regra;
3. registre falhas observáveis e sinais diagnósticos;
4. faça uma mutação pequena;
5. compare o resultado com a versão anterior;
6. mantenha a versão que melhora o resultado sem ampliar indevidamente o
   escopo.

## Contexto atual do projeto

### Cenário

O repositório é um laboratório inicial para criação e execução de agentes de
software. A camada comum de ensino e harness existe nas branches de atividade;
`main` também contém a aplicação em `projeto/`. Inspecione a branch atual antes
de afirmar que um arquivo ou componente está presente.

### Restrições conhecidas

- A documentação local deve ser priorizada antes de fontes externas.
- Skills de pesquisa não devem modificar a documentação sem solicitação
  explícita, exceto notas sobre a stack em `docs/tech-stack/` apoiadas em fontes
  oficiais e validadas na prática. Essa exceção permite somente os ajustes de
  links no índice e o registro no changelog necessários à nota; uma proibição
  explícita de escrita prevalece sobre a exceção.
- Novas regras devem ser específicas o suficiente para orientar decisões, sem
  transformar exemplos isolados em obrigações universais.
- O estado do projeto deve ser verificável a partir dos arquivos versionados.

### Stack atual

Na branch `jornada-1`, o runtime dos verificadores é Node.js 22 ou superior,
sem dependências externas. A aplicação JavaScript fica na branch `main`.
A tag `base-original` preserva o estado anterior à atividade.

### Arquitetura atual

- `AGENTS.md`: contexto e regras locais para agentes.
- `docs/`: documentação do projeto.
- `.harness/SKILLS/`: skills específicas deste harness.
- `.harness/CHANGELOG.md`: histórico das alterações realizadas por agentes.
- `.harness/MEMORY.md`: decisões e descobertas duráveis entre sessões.

Diretórios ainda não presentes não devem ser tratados como componentes
existentes da arquitetura.

## Convenções de documentação

- Use Markdown válido e títulos hierárquicos.
- Escreva em português claro, com acentuação consistente.
- Use caminhos relativos à raiz do projeto, salvo quando um caminho absoluto
  for indispensável.
- Prefira instruções acionáveis a descrições genéricas.
- Indique explicitamente quando uma informação é desconhecida, inferida ou
  ainda não documentada.
- Ao criar ou mover documentos em `docs/`, mantenha `docs/INDEX.md` atualizado.

## Changelog

Registre cada alteração feita por um agente em `.harness/CHANGELOG.md`.
Cada entrada deve ter no máximo 2000 caracteres e seguir este formato:

```text
======================
Data: YYYY-MM-DD
Prompt: <solicitação que originou a alteração>
Resultado: <resultado obtido>
Arquivos: <arquivos alterados>
Verificação: <checagens executadas>
Autor: <nome do agente ou autor>
```

Não registre segredos, tokens ou dados pessoais desnecessários.

## Memória entre sessões

Use `.harness/MEMORY.md` apenas para informações que continuem úteis depois da
sessão atual, como decisões arquiteturais, restrições descobertas ou problemas
recorrentes.

- Leia o arquivo quando o trabalho depender de decisões anteriores.
- Não crie uma entrada para cada ação rotineira.
- Mantenha no máximo 20 entradas.
- Use timestamp no formato `YYYY-MM-DD HH:MM:SS`.
- Quando uma decisão nova substituir uma antiga, marque a anterior como
  superada ou remova-a se não houver valor histórico.
- Não armazene credenciais, informações pessoais ou dados efêmeros.

Formato de entrada:

```text
======================
Timestamp: YYYY-MM-DD HH:MM:SS
Entrada: <decisão, descoberta ou restrição durável>
```

## Critérios de conclusão

Antes de concluir uma tarefa, confirme:

- não há trabalho necessário pendente;
- as alterações estão limitadas ao escopo solicitado;
- as verificações relevantes foram executadas;
- arquivos referenciados existem ou a ausência foi reportada;
- o changelog foi atualizado quando houve alterações;
- riscos ou limitações conhecidos foram comunicados.
