import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

const raiz = resolve(import.meta.dirname, '..');
const script = resolve(raiz, 'scripts/verificar-harness.mjs');

function fixture() {
  const base = mkdtempSync(resolve(tmpdir(), 'harness-entrada-'));
  const git = (...args) => {
    const r = spawnSync('git', args, { cwd: base, encoding: 'utf8', env: {
      ...process.env, GIT_AUTHOR_NAME: 'Teste', GIT_AUTHOR_EMAIL: 'teste@example.invalid',
      GIT_COMMITTER_NAME: 'Teste', GIT_COMMITTER_EMAIL: 'teste@example.invalid',
    } });
    assert.equal(r.status, 0, r.stderr);
  };
  const escrever = (p, texto) => {
    mkdirSync(dirname(resolve(base, p)), { recursive: true });
    writeFileSync(resolve(base, p), texto);
  };
  // A fixture usa a lista exportada pelo verificador.
  return { base, git, escrever };
}

test('entradas sem encaminhamento ao contrato central são rejeitadas mesmo sem comparar branches', async () => {
  const r = fixture();
  try {
    const { arquivosComuns, verificarHarness } = await import('../scripts/verificar-harness.mjs');
    for (const p of arquivosComuns) r.escrever(p, readFileSync(resolve(raiz, p), 'utf8'));
    assert.deepEqual(verificarHarness(r.base), []);
    r.escrever('CLAUDE.md', '# Instruções isoladas\n');
    assert.ok(verificarHarness(r.base).some(e => /CLAUDE\.md.*AGENTS\.md/.test(e)));
    rmSync(resolve(r.base, 'AGENTS.md'));
    assert.ok(verificarHarness(r.base).some(e => /Núcleo comum ausente: AGENTS\.md/.test(e)));
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});

test('verificador aceita o núcleo comum e detecta divergência sem trocar de branch', async () => {
  const r = fixture();
  try {
    const { arquivosComuns } = await import('../scripts/verificar-harness.mjs');
    for (const p of arquivosComuns) r.escrever(p, readFileSync(resolve(raiz, p), 'utf8'));
    r.git('init', '-b', 'main');
    r.git('add', '.'); r.git('commit', '-m', 'núcleo comum');
    r.git('branch', 'jornada-1');
    const executar = refs => spawnSync(process.execPath, [script, ...refs], { cwd: r.base, encoding: 'utf8' });
    const ok = executar(['main', 'jornada-1']);
    assert.equal(ok.status, 0, ok.stderr);
    r.escrever('README.md', '# README divergente\n');
    const divergencia = executar(['main', 'jornada-1']);
    assert.equal(divergencia.status, 1);
    assert.match(divergencia.stderr, /README\.md.*main/);
    assert.equal(spawnSync('git', ['branch', '--show-current'], { cwd: r.base, encoding: 'utf8' }).stdout.trim(), 'main');
    assert.equal(readFileSync(resolve(r.base, 'README.md'), 'utf8'), '# README divergente\n');
    r.escrever('README.md', readFileSync(resolve(raiz, 'README.md'), 'utf8'));
    const ausente = executar(['jornada-inexistente']);
    assert.equal(ausente.status, 1);
    assert.match(ausente.stderr, /Referência indisponível.*jornada-inexistente/);
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});
