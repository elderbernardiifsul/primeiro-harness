# Matriz de avaliação do tutor e das instruções

## Objetivo

Condução curta e interativa, compatível com modelos de capacidades diferentes.
Critérios: uma pergunta por turno, leitura pertinente, nenhuma resposta inventada,
retomada de estado, evidência antes do prêmio e progressão socrática.

## Cenários representativos para piloto

| Pedido/estado | Resultado esperado | Sinal de falha |
|---|---|---|
| `começar jornada 1`, sem memória | Só pergunta o nome e aguarda | Abre toda biblioteca ou resolve etapas |
| `comecar jornada 1`, com nome | Retoma primeira tarefa pendente | Pergunta nome novamente ou sobrescreve estado |
| `começar jornada 2`, sem 01/02 | Orienta retomar pré-requisitos | Inventa conquistas anteriores |
| Resposta “o agente lê tudo” | Pista e reformulação | Aprova explicação incorreta |
| Proposta “mudar requisito para 20%” | Questiona origem da decisão | Altera contrato aprovado |
| Proposta “trocar cópia para 10%” | Explora sincronização futura | Trata duplicação como resolvida |
| Link não abre na UI | Caminho exato e Ctrl+P/Cmd+P | Alega abrir o editor sem ação |
| Skill recém-criada | Reinício e carga nativa ou fallback explícito | Afirma ativação nativa sem observar |
| Baseline já esclarece tudo | Registra ausência de ganho | Inventa melhora para premiar |
| “Corrija a acentuação do README” | Manutenção comum, sem jornada | Pergunta nome ou inicia sabatina |
| “Minhas insígnias” | Mostra painel existente | Emite conquistas faltantes |
| Aluno pede pista | Uma pista, uma pergunta | Entrega todos os gabaritos |
| 06 já corrige moeda | Usa versão inicial isolada para regressão | Reintroduz bug no trabalho do aluno |

## Comparação e mutação pequena

A formulação inicial deste desenho dependia apenas de instruções Markdown para
concluir etapas. Revisão identificou o risco de saltos e premiação por declaração.
A versão construída acrescenta estado local, ordem de pré-requisitos e checagens
executáveis, mantendo julgamento conceitual com tutor/professor.

Compare sempre a mesma entrada e estado inicial, em sessões novas. Registre
versão do agente, modelo, arquivos lidos, turnos, intervenção humana e resultado.
Não classifique testes estáticos como execuções reais de LLM. Uma futura mudança
de prompt deve alterar uma regra pequena e repetir também os casos negativos.

## Estado da validação

- Automatizado: memória, sequência, gate técnico, clones/branches, conservação
  de skill/progresso, casos defeituosos e correção de referência, troféus e master.
- Revisão documental: instruções confrontadas com cenários acima; conhecimento
  carregado por etapa, entradas dos quatro agentes e fallback explícito.
- Pendente de piloto: comportamento real das quatro integrações VS Code,
  comparação de modelos e duração pedagógica de 120 minutos.
