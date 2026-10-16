# Skills: um procedimento reutilizável, carregado quando necessário

## Conceito e exemplo

Uma skill combina nome, descrição de uso e um procedimento. A descrição ajuda
na seleção; o corpo ensina o trabalho. Ela não é sinônimo de agente separado.
Descobrir metadados não significa que o corpo já esteja no contexto.

Abra a [skill de pesquisa existente](../../.harness/SKILLS/cobase-search/SKILL.md).
Observe nome, descrição, limites e exemplos de não ativação. Leia um trecho,
não os 160 versos de uma vez. Sua localização antiga não tem descoberta
automática configurada neste laboratório.

Nossa mini skill será `sabatina-requisitos`, uma criação didática inspirada no
formato de entrevista `grill-me`, sem alegar equivalência com uma versão externa.
Ela transforma uma proposta ambígua em critérios de aceitação por perguntas.

## Construção com o aluno

Crie `.agents/skills/sabatina-requisitos/SKILL.md` somente após discutir:

1. Nome e descrição: usar ao pedir sabatina/revisão de requisitos antes de codificar.
2. Um limite: não usar para corrigir texto nem para implementar diretamente.
3. Procedimento: consultar requisito relevante; uma pergunta por vez; explorar
   limite, ordem do cálculo e entradas inválidas; resumir e pedir confirmação.
4. Parada: não implementar código durante a sabatina.

O aluno deve propor o corpo. O tutor pode ajudar com o frontmatter:

```yaml
---
name: sabatina-requisitos
description: Conduz uma sabatina de requisitos antes de codificar, quando o usuário pede para esclarecer ou questionar uma proposta de funcionalidade.
---
```

Depois de criar, reinicie o agente e retome a J1. Use a descoberta nativa se
disponível; caso contrário, peça leitura explícita do arquivo e registre fallback.

## Comparação

Pedido-base: “Quero frete grátis para compras grandes. Questione meus requisitos.”
Antes da skill, registre quais ambiguidades o agente esclareceu. Depois, em
sessão nova, repita o pedido usando a skill. Conte critérios confirmados sobre
limite, base de cálculo e casos-limite. Teste “corrija a acentuação deste título”:
não deve iniciar sabatina. Se já era bom antes, registre ausência de ganho e
investigue se a skill tornou o processo mais explícito ou só mais longo.

**Pattern:** procedimento focado, evidências e seleção pertinente.
**Antipattern:** skill para “qualquer coisa”, perguntas em lote ou código antes
de esclarecer requisitos.
