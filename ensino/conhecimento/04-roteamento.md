# Roteamento: contexto certo, na hora certa

## Antipattern

Um índice pode apontar para um documento real, coerente e obsoleto. Links válidos
não garantem relevância. Ler esse caminho primeiro pode fazer o agente aplicar
uma política aposentada sem conhecer a atual.

Na main, abra `projeto/docs/INDEX.md`, depois o destino “Contrato do carrinho”.
Compare o destino com `projeto/docs/requisitos.md`: 5% versus 10% de desconto.
Em 100 reais, uma execução guiada pelo arquivo antigo obtém 95, não 90.

## Pattern

O índice encaminha primeiro ao contrato vigente. O histórico permanece acessível
e rotulado como histórico, sem competir como instrução operacional.
Contexto sob demanda não significa esconder fontes contraditórias: significa
identificar seu papel e prioridade, com uma referência acionável.

**Pergunta:** como o agente poderia obter a resposta errada mesmo obedecendo
à instrução “leia o índice primeiro”?

**Ação:** propor um índice que distinga vigente e histórico. **Evidência:**
comparar destino da rota e total de 100 reais antes/depois. Na ausência de um
erro real do modelo, use o reprodutor determinístico e registre a diferença.

**Não ativação:** mover um documento histórico que não orienta nenhuma tarefa
não exige carregar todo seu conteúdo em toda sessão.
