# Conquistas, evidências e memória local

| ID | Prêmio | Requisito |
|---|---|---|
| 01 | Aprendiz do Contexto | Explicar contexto recebido, leitura explícita e limites |
| 02 | Forjador de Skills | Construir a skill e comparar antes/depois, incluindo não ativação |
| 03 | Detetive das Contradições | Eliminar uma regra duplicada sem apagar o requisito vigente |
| 04 | Guardião do Contexto | Encaminhar leitura para a referência vigente |
| 05 | Sentinela da Evidência | Tornar a verificação relevante parte da conclusão |
| 06 | Arquiteto da Entrega | Entregar frete com critérios, casos-limite e revisão |
| 07 | Caçador de Bugs | Reproduzir e corrigir um defeito monetário sem regressão |
| MASTER | MASTER OF THE PROMPTS | Todas as anteriores e revalidação final |

## Comandos na raiz

```sh
node scripts/lab.mjs iniciar "Seu nome"
node scripts/lab.mjs status
node scripts/lab.mjs marco "J1: aguardando explicação sobre skills"
node scripts/lab.mjs premiar 01
node scripts/lab.mjs painel
```

O nome é pedido pelo tutor antes de iniciar a J1. `iniciar` cria uma memória uma
única vez; não apaga um registro existente. Use nome de exibição de até 64
caracteres, sem caracteres de controle. Não é necessário nome civil completo.
O identificador aleatório é local, independente do nome, e não muda ao reimprimir.

## Contrato de evidência

O tutor cria `.aluno/evidencias/NN.json` somente após interação e verificação:

```json
{
  "resposta": "Síntese fiel do que o aluno explicou, com suas próprias palavras.",
  "proposta": "A mudança que o aluno propôs e sua relação com a causa.",
  "feedback": "O que estava correto, eventual pista e como o aluno reformulou.",
  "antes": "Entrada, comando e resultado observado antes da mudança.",
  "depois": "Entrada, comando e resultado observado depois da mudança.",
  "arquivos": ["AGENTS.md"],
  "observacao": "Uma descoberta real deste aluno, para a mensagem final."
}
```

01 é conceitual: antes/depois podem comparar a hipótese inicial ao mapa de
contexto observado. Em 02, acrescente `criteriosConfirmados`, um array com pelo
menos três critérios discutidos e confirmados pelo aluno para a sabatina.
Em 03–05, antes/depois incluem o caso reproduzível do antipattern. Em 06, mostram
ausência e presença do frete; em 07, a reprodução que falhava e a regressão verde.
Não cole este exemplo como resposta. Campos preenchidos não provam compreensão:
o tutor precisa avaliar o conteúdo; o professor pode conferir os registros.

## Funcionamento e limites

O emissor exige ordem, arquivos existentes, evidência preenchida e verificações
específicas. Salva resumo das verificações e hash da evidência, além do desenho.
As checagens não são antifraude, assinatura docente ou avaliação semântica.
Nunca altere o verificador ou os testes para obter uma conquista.

Insígnias já emitidas mantêm o selo. `master` revalida os artefatos atuais.
Para reimprimir, execute `painel`; para entregar, faça um print em fonte
monoespaçada de `.aluno/insignias/PAINEL.txt`. Guarde os JSON para revisão.
