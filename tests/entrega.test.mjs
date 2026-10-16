import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, cpSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { laboratorio } from '../scripts/lab.mjs';

function fixture() {
  const raiz = mkdtempSync(resolve(tmpdir(), 'harness-entrega-'));
  const lab = laboratorio(raiz);
  return { raiz, lab, limpar: () => rmSync(raiz, { recursive: true, force: true }) };
}

async function fixtureComConquista() {
  const f = fixture();
  f.lab.iniciar('Aluna de Teste');
  mkdirSync(resolve(f.raiz, '.aluno/evidencias'), { recursive: true });
  writeFileSync(resolve(f.raiz, 'AGENTS.md'), '# Entrada da fixture\n');
  writeFileSync(resolve(f.raiz, '.aluno/evidencias/01.json'), JSON.stringify({
    resposta: 'Distingui arquivo existente de leitura explícita.',
    proposta: 'Conferir os arquivos e os mecanismos de leitura.',
    feedback: 'A distinção foi revisada com um contraexemplo.',
    antes: 'A hipótese era que todos os arquivos fossem carregados.',
    depois: 'A comparação mostrou leituras concretas do agente.',
    observacao: 'Existência do arquivo não demonstra carregamento.',
    arquivos: ['AGENTS.md'],
  }));
  // Emissão real pela API, em fixture isolada; não escrever progresso ou selos à mão.
  await f.lab.premiar('01');
  return f;
}

test('entrega sem conquistas mostra relatório parcial sem criar evidências ou prêmios', () => {
  const f = fixture();
  try {
    f.lab.iniciar('Aluna de Teste');
    const memoria = readFileSync(resolve(f.raiz, '.aluno/progresso.json'), 'utf8');
    const relatorio = f.lab.entrega();
    assert.match(relatorio, /RELATÓRIO DE ENTREGA/);
    assert.match(relatorio, /Aluna de Teste/);
    assert.match(relatorio, /Conquistas: 0\/7/);
    assert.match(relatorio, /MASTER: não emitido/);
    assert.match(relatorio, /Situação: PARCIAL/);
    assert.match(relatorio, /Nenhuma evidência encontrada/);
    assert.match(relatorio, /print ou fotografia desta tela/i);
    assert.equal(readFileSync(resolve(f.raiz, '.aluno/ENTREGA.txt'), 'utf8'), relatorio);
    assert.equal(readFileSync(resolve(f.raiz, '.aluno/progresso.json'), 'utf8'), memoria);
    assert.equal(existsSync(resolve(f.raiz, '.aluno/evidencias')), false);
    assert.equal(existsSync(resolve(f.raiz, '.aluno/insignias')), false);
  } finally { f.limpar(); }
});

test('entrega lista a insígnia emitida e todos os arquivos diretos de evidência sem alterar os registros', async () => {
  const f = await fixtureComConquista();
  try {
    writeFileSync(resolve(f.raiz, '.aluno/evidencias/anotacoes.txt'), 'Anotação adicional da fixture.');
    writeFileSync(resolve(f.raiz, '.aluno/evidencias/03.json'), '{}');
    const caminhos = ['.aluno/progresso.json', '.aluno/evidencias/01.json', '.aluno/insignias/01.txt'];
    const antes = caminhos.map(p => readFileSync(resolve(f.raiz, p), 'utf8'));
    const relatorio = f.lab.entrega();
    assert.match(relatorio, /Conquistas: 1\/7/);
    assert.match(relatorio, /01 APRENDIZ DO CONTEXTO/);
    assert.ok(relatorio.includes(f.lab.carregar().conquistas['01'].selo));
    assert.doesNotMatch(relatorio, /DETETIVE DAS CONTRADICOES/);
    assert.match(relatorio, /ARQUIVOS EM \.aluno\/evidencias\/ \(3\)/);
    assert.match(relatorio, /01\.json \[hash confere\]/);
    assert.match(relatorio, /03\.json \[sem conquista associada\]/);
    assert.match(relatorio, /anotacoes\.txt/);
    f.lab.entrega();
    assert.deepEqual(caminhos.map(p => readFileSync(resolve(f.raiz, p), 'utf8')), antes);
  } finally { f.limpar(); }
});

test('entrega aponta evidência removida sem recriar o arquivo ou retirar a insígnia', async () => {
  const f = await fixtureComConquista();
  try {
    const selo = f.lab.carregar().conquistas['01'].selo;
    rmSync(resolve(f.raiz, '.aluno/evidencias/01.json'));
    const relatorio = f.lab.entrega();
    assert.match(relatorio, /Evidência 01\.json ausente/);
    assert.match(relatorio, /Situação: PARCIAL/);
    assert.equal(f.lab.carregar().conquistas['01'].selo, selo);
    assert.equal(existsSync(resolve(f.raiz, '.aluno/evidencias/01.json')), false);
  } finally { f.limpar(); }
});

test('entrega aponta hash alterado e JSON inválido sem esconder a pendência', async () => {
  const f = await fixtureComConquista();
  try {
    const caminho = resolve(f.raiz, '.aluno/evidencias/01.json');
    writeFileSync(caminho, readFileSync(caminho, 'utf8') + '\n');
    assert.match(f.lab.entrega(), /Evidência 01\.json: alterada após a emissão/);
    writeFileSync(caminho, '{JSON inválido');
    const relatorio = f.lab.entrega();
    assert.match(relatorio, /01\.json \[PENDÊNCIA\]/);
    assert.match(relatorio, /Situação: PARCIAL/);
    assert.equal(readFileSync(caminho, 'utf8'), '{JSON inválido');
  } finally { f.limpar(); }
});

test('entrega sem memória informa a pendência e não cria .aluno', () => {
  const f = fixture();
  try {
    assert.throws(() => f.lab.entrega(), /Sem memória local/);
    assert.equal(existsSync(resolve(f.raiz, '.aluno')), false);
  } finally { f.limpar(); }
});

test('CLI entrega imprime e salva o relatório a partir da raiz isolada', async () => {
  const f = await fixtureComConquista();
  try {
    const scripts = resolve(import.meta.dirname, '../scripts');
    mkdirSync(resolve(f.raiz, 'scripts'));
    for (const nome of ['lab.mjs', 'jornadas.mjs', 'verificacoes.mjs', 'trofeus.mjs']) {
      cpSync(resolve(scripts, nome), resolve(f.raiz, 'scripts', nome));
    }
    const antes = readFileSync(resolve(f.raiz, '.aluno/progresso.json'), 'utf8');
    const r = spawnSync(process.execPath, ['scripts/lab.mjs', 'entrega'], { cwd: f.raiz, encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /RELATÓRIO DE ENTREGA/);
    assert.match(r.stdout, /01\.json \[hash confere\]/);
    assert.equal(r.stdout.trimEnd(), readFileSync(resolve(f.raiz, '.aluno/ENTREGA.txt'), 'utf8').trimEnd());
    assert.equal(readFileSync(resolve(f.raiz, '.aluno/progresso.json'), 'utf8'), antes);
  } finally { f.limpar(); }
});
