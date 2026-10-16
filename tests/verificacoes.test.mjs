import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { verificarTarefa } from '../scripts/verificacoes.mjs';

// Fixtures próprias: nunca corrigir projeto/ nem emitir conquistas para testar o laboratório.
function fixture() {
  const raiz = mkdtempSync(resolve(tmpdir(), 'harness-verificacoes-'));
  const escrever = (caminho, texto) => {
    mkdirSync(dirname(resolve(raiz, caminho)), { recursive: true });
    writeFileSync(resolve(raiz, caminho), texto);
  };
  escrever('projeto/docs/requisitos.md', '# Contrato vigente\nDesconto: 10%.\n');
  escrever('projeto/docs/INDEX.md', '[Contrato vigente](requisitos.md)\nReferência histórica.\n');
  escrever('projeto/package.json', JSON.stringify({ scripts: { test: 'node --test tests/*.test.mjs' } }));
  escrever('projeto/tests/smoke.test.mjs', "import test from 'node:test';\ntest('smoke', () => {});\n");
  const guia = texto => escrever('projeto/AGENTS.md', `# Guia\nContrato: docs/requisitos.md.\n${texto}\n`);
  guia('Para concluir, execute npm test e confira a suíte completa.');
  return { raiz, escrever, guia, limpar: () => rmSync(raiz, { recursive: true, force: true }) };
}

for (const orientacao of [
  'Para concluir, execute npm test e confira a suíte completa. O smoke isolado não é suficiente.',
  'Não use apenas o smoke para concluir. Execute npm test e confira a suíte completa.',
  'O smoke isolado é insuficiente. Execute npm test para verificar a suíte completa.',
  'Execute npm test; ele deve cobrir todos os testes. O smoke serve como diagnóstico inicial.',
  'Execute npm test para concluir; a verificação completa é suficiente para este passo técnico.',
]) {
  test(`conquista 05 aceita orientação com comando completo: ${orientacao}`, async () => {
    const f = fixture();
    try {
      f.guia(orientacao);
      assert.ok((await verificarTarefa(f.raiz, '05', {})).includes('Comando padrão completo e suíte passando.'));
    } finally { f.limpar(); }
  });
}

test('conquista 05 rejeita comando padrão restrito ao smoke mesmo com guia correto', async () => {
  const f = fixture();
  try {
    f.escrever('projeto/package.json', JSON.stringify({ scripts: { test: 'node --test tests/smoke.test.mjs' } }));
    await assert.rejects(verificarTarefa(f.raiz, '05', {}), /suíte completa/);
  } finally { f.limpar(); }
});

test('conquista 05 rejeita guia sem o comando completo documentado', async () => {
  const f = fixture();
  try {
    f.guia('Execute apenas node --test tests/smoke.test.mjs para concluir.');
    await assert.rejects(verificarTarefa(f.raiz, '05', {}), /Documente a verificação completa/);
  } finally { f.limpar(); }
});

for (const separador of [' ', '\n']) {
  test(`conquista 05 rejeita o parágrafo defeituoso original (${JSON.stringify(separador)})`, async () => {
    const f = fixture();
    try {
      f.guia('Execute `npm test` dentro de `projeto/`. Apenas o smoke é suficiente para' +
        separador + 'considerar qualquer mudança concluída. Não é necessário rodar a suíte completa.');
      await assert.rejects(verificarTarefa(f.raiz, '05', {}), /orientação original de conclusão/);
    } finally { f.limpar(); }
  });
}

test('conquista 05 executa a suíte completa e rejeita falha fora do smoke', async () => {
  const f = fixture();
  try {
    f.escrever('projeto/tests/regressao.test.mjs', "import test from 'node:test';\nimport assert from 'node:assert/strict';\ntest('falha fora do smoke', () => assert.fail('regressão de controle'));\n");
    await assert.rejects(verificarTarefa(f.raiz, '05', {}), /Testes falharam/);
  } finally { f.limpar(); }
});

test('conquista 05 mantém os gates do contrato e do índice', async () => {
  const f = fixture();
  try {
    f.guia('Desconto duplicado: 20%. Execute npm test.');
    await assert.rejects(verificarTarefa(f.raiz, '05', {}), /porcentagem duplicada/);
    f.guia('Execute npm test e confira a suíte completa.');
    f.escrever('projeto/docs/INDEX.md', '[Histórico](antigo.md)\n[Contrato](requisitos.md)\n');
    await assert.rejects(verificarTarefa(f.raiz, '05', {}), /primeiro destino/);
  } finally { f.limpar(); }
});
