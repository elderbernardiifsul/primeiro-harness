# Fonte de verdade: regra única, referências múltiplas

## Antipattern

Copiar uma regra para instruções, resumo e requisito cria manutenção sincronizada.
Quando uma cópia muda e outra não, o agente recebe respostas incompatíveis.
“Seguir o arquivo mais perto” não resolve qual decisão de negócio está vigente.

Na main, abra `projeto/AGENTS.md`, seção “Regra rápida”, e
`projeto/docs/requisitos.md`, seção “Desconto”. Um diz 20%; outro, 10%.
Em 100 reais, isso produz 80 ou 90 reais. Ambas as contas são matematicamente
válidas; só uma satisfaz o contrato vigente.

## Pattern

Centralize o valor no requisito vigente e substitua a cópia pela referência.
Não “resolva” alterando o requisito de negócio para combinar com a cópia antiga.
Preserve a decisão aprovada; elimine a necessidade de sincronização.

**Pergunta:** de onde veio a divergência e por que mudar apenas o código não
impede que o problema volte na próxima sessão?

**Ação:** propor a mudança em `projeto/AGENTS.md` e prever o efeito sobre um
pedido de desconto. **Evidência:** entrada de 100 reais, resultados 80/90,
fonte da decisão e diff que substitui o valor duplicado pela referência.

**Não generalize:** exemplos numéricos em testes são necessários. Duplicação
problemática aqui é manter duas prescrições vigentes divergentes, não todo número
repetido em qualquer arquivo.
