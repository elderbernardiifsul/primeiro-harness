# Verificação: verde em qual pergunta?

## Antipattern

“O comando passou” não significa “o requisito foi atendido”. Um smoke test pode
confirmar uma soma simples e não avaliar descontos, validação ou frete.

Na main, abra `projeto/package.json`, scripts `test` e `test:completo`, e
`projeto/AGENTS.md`, seção “Conclusão”. Execute os dois comandos. Compare o
que foi efetivamente exercitado, não só as cores do terminal.

## Pattern

Escolha verificações relacionadas à mudança e uma suíte de regressão pertinente.
Aqui a rotina de conclusão deve executar a suíte completa, sem transformar o
smoke em garantia universal. Uma suíte completa também tem lacunas: um novo bug
deverá gerar sua própria reprodução e um teste de regressão significativo.

**Pergunta:** qual requisito continua sem evidência quando apenas o smoke passa?

**Ação:** corrigir a rotina de verificação e o cálculo de desconto ligado à regra
vigente, preservando os testes. **Evidência:** smoke verde, suíte completa vermelha
antes; ambos verdes depois da correção pertinente. Leia a falha antes de editar.

Não adicione testes de cada frase do Markdown. Use checagem estrutural para rotas
e testes comportamentais para o produto; entendimento exige conversa e revisão.
