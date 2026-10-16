# Guia docente — primeiro harness

## Objetivo e critérios de sucesso

Em duas horas, formandos devem distinguir contexto disponível de arquivos
existentes, escrever uma mini skill, corrigir três causas no harness e demonstrar
uma entrega e uma depuração. O aluno explica as decisões; o agente não resolve
o roteiro inteiro em um turno.

Preparação fora das duas horas: Node.js 22+, Git, VS Code, agente autenticado e
clone em `jornada-1`. Use o melhor modelo disponível. Repetição com modelo menor
é extensão; não reduzir a aula a uma comparação de respostas de modelos.

## Publicação pelo professor

O repositório público está em
https://github.com/elderbernardiifsul/primeiro-harness, com remoto `origin`.
Para publicar atualizações, após revisar os arquivos e fazer os commits:

```sh
git push -u origin main
git push origin jornada-1 professor
git push origin base-original
```

Não publique `.aluno/`. O README contém o comando com o endereço definitivo.
Clone sem `--single-branch`: o tutor precisa consultar a
referência `origin/professor`. Nenhuma credencial deve entrar nos documentos.

## Organização

- `base-original`: fotografia do estado anterior, sem adaptação pedagógica.
- `jornada-1`: tutor, conhecimentos, verificadores e passeio inicial, sem produto.
- `main`: mesmos mecanismos, mais produto propositalmente defeituoso e J2/J3.
- `professor`: deriva da main e acrescenta este guia, pistas, soluções, modelos
  e validador isolado. Não modifica o exercício que o aluno recebe.

O tutor consulta `node scripts/professor.mjs pistas` sem checkout. Há fallback
para `origin/professor` no clone. `solucoes` é consulta após tentativas. A branch
não é barreira de acesso ao gabarito; a avaliação exige explicação e evidências.

## Cronograma

| Minutos | Trabalho | Prêmios |
|---|---|---|
| 0–12 | Contexto, instruções e memória | 01 |
| 12–30 | Mini skill e comparação | 02 |
| 30–35 | Transição e leitura do produto | — |
| 35–50 | Prescrições divergentes | 03 |
| 50–65 | Rota obsoleta | 04 |
| 65–80 | Verificação incompleta e desconto | 05 |
| 80–100 | Checkout e frete | 06 |
| 100–115 | Defeito monetário | 07 |
| 115–120 | Troféu master e entrega | MASTER |

Se precisar intervir no tempo, dê uma pista mais concreta. Não fabrique respostas
do aluno nem elimine sua oportunidade de explicar a decisão.

## Avaliação sugerida

- 30% compreensão e explicação do código/contexto;
- 25% qualidade das verificações;
- 20% justificativa das decisões sobre o harness;
- 15% correção funcional;
- 10% clareza e reprodutibilidade dos registros.

O print é um marco de conclusão, não autenticação de aprendizagem. Confira uma
amostra das evidências e peça a explicação de um diff ou de um caso-limite.
Uma melhoria sem ganho mensurável pode receber crédito se a comparação foi
honesta e o aluno identificou seus limites.

## Antes de aplicar

Na branch professor, execute `node professor/validar.mjs` e `npm run verificar`.
O validador cria um clone temporário, exercita o estado defeituoso, aplica os
modelos de referência por etapas e emite as sete conquistas e master. Nunca
aplica soluções na árvore de trabalho do laboratório.

Faça também um piloto com um aluno ou docente no VS Code. Use a matriz em
[avaliação do tutor](avaliacao.md). Os testes automatizados não verificam
obediência do LLM, links clicáveis de cada UI ou duração real de aprendizagem.

## Privacidade e portabilidade

Só o nome de exibição é solicitado. Fica em `.aluno/`, ignorado pelo Git, assim
como as conquistas, evidências e os troféus. Não copie nomes reais para changelog,
memória institucional ou exemplos. A skill criada pelo aluno é ignorada para
persistir na troca de branch. Faça nova atividade em outro clone, não apagando
registros de uma sessão concluída.
