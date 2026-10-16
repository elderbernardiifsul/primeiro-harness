import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { laboratorio } from '../scripts/lab.mjs';

const evidencia = {
  resposta: 'Distingui arquivos presentes de contexto efetivamente carregado.',
  proposta: 'Criar uma skill focada em esclarecer requisitos antes do código.',
  feedback: 'Explicação revisada com um exemplo e um caso de não ativação.',
  antes: 'A proposta não definia limite, base de cálculo e entradas inválidas.',
  depois: 'Três critérios foram confirmados e o caso negativo foi observado.',
  observacao: 'Uma confirmação verbal não equivale a completar uma jornada.',
  arquivos: ['AGENTS.md'],
  criteriosConfirmados: ['Limite inclusivo após desconto e arredondamento.',
    'Carrinho vazio não deve pagar o frete.', 'Entradas inválidas devem gerar erro.'],
};

function repositorio(comMemoria = true) {
  const base = mkdtempSync(resolve(tmpdir(), 'harness-jornadas-'));
  const escrever = (arquivo, texto) => {
    mkdirSync(dirname(resolve(base, arquivo)), { recursive: true });
    writeFileSync(resolve(base, arquivo), texto);
  };
  const git = (...args) => {
    const r = spawnSync('git', args, { cwd: base, encoding: 'utf8', env: {
      ...process.env, GIT_AUTHOR_NAME: 'Teste', GIT_AUTHOR_EMAIL: 'teste@example.invalid',
      GIT_COMMITTER_NAME: 'Teste', GIT_COMMITTER_EMAIL: 'teste@example.invalid',
    } });
    assert.equal(r.status, 0, r.stderr);
    return r.stdout.trim();
  };
  git('init', '-b', 'jornada-1');
  escrever('.gitignore', '.aluno/\n.agents/\n');
  escrever('AGENTS.md', '# Entrada compartilhada\n');
  escrever('ensino/jornadas/01.md', '# Jornada 1\n');
  escrever('somente-j1.md', '# Referência disponível na branch da primeira etapa\n');
  git('add', '.'); git('commit', '-m', 'base de teste');
  git('switch', '-c', 'main');
  rmSync(resolve(base, 'somente-j1.md'));
  escrever('ensino/jornadas/02.md', '# Jornada 2\n');
  escrever('ensino/jornadas/03.md', '# Jornada 3\n');
  escrever('projeto/package.json', '{}\n');
  escrever('projeto/src/carrinho.mjs', 'export const exemplo = true;\n');
  git('add', '.'); git('commit', '-m', 'produto de teste');
  git('switch', 'jornada-1');
  const lab = laboratorio(base);
  if (comMemoria) lab.iniciar('Pessoa Sintetica');
  async function concluirPrimeira(arquivos = ['AGENTS.md']) {
    for (const id of ['01', '02']) {
      escrever(`.aluno/evidencias/${id}.json`, JSON.stringify({ ...evidencia, arquivos }));
      if (id === '02') escrever('.agents/skills/sabatina-requisitos/SKILL.md', `---
name: sabatina-requisitos
description: Esclarece requisitos por entrevista antes de implementar uma funcionalidade.
---
# Sabatina de requisitos
Leia o contrato relacionado à proposta antes de entrevistar. Faça uma pergunta
por vez e aguarde a resposta. Explore limite, base de cálculo e entradas inválidas
em turnos separados. Resuma os critérios e peça confirmação ao aluno antes de
encerrar. Não implemente código durante a sabatina. Não use para revisão textual.
`);
      await lab.premiar(id);
    }
  }
  return { base, lab, git, escrever, concluirPrimeira };
}

test('sem memória, a próxima jornada encaminha para a primeira sem trocar de branch', () => {
  const r = repositorio(false);
  try {
    assert.throws(() => r.lab.prepararJornada(2, { trocarBranch: true }), /comece primeiro a jornada 1/);
    assert.throws(() => r.lab.prepararJornada(1), /Pergunte o nome/);
    assert.equal(r.git('branch', '--show-current'), 'jornada-1');
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});

test('incompleta bloqueia avanço e encerramento antes de qualquer troca de branch', async () => {
  const r = repositorio();
  try {
    assert.equal(r.lab.prepararJornada(1).branch, 'jornada-1');
    assert.throws(() => r.lab.prepararJornada(2, { trocarBranch: true }), /jornada 1, tarefa 01/);
    await assert.rejects(r.lab.encerrarJornada(1), /jornada 1, tarefa 01/);
    assert.equal(r.git('branch', '--show-current'), 'jornada-1');
    assert.equal(r.lab.carregar().jornadasConcluidas, undefined);
    assert.throws(() => r.lab.prepararJornada(4), /jornada 1, 2 ou 3/);
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});

test('conclusão verificada prepara main, preserva memória/skill e exige nova sessão', async () => {
  const r = repositorio();
  try {
    await r.concluirPrimeira();
    const identidade = r.lab.carregar().alunoId;
    assert.match(await r.lab.encerrarJornada(1), /nova sessão/);
    assert.ok(r.lab.carregar().jornadasConcluidas['1']);
    assert.throws(() => r.lab.prepararJornada(2), /Branch incompatível/);
    const preparado = r.lab.prepararJornada(2, { trocarBranch: true });
    assert.equal(preparado.branch, 'main');
    assert.equal(preparado.trocouBranch, true);
    assert.match(preparado.orientacao, /Não inicie a jornada nesta sessão/);
    assert.equal(r.lab.carregar().alunoId, identidade);
    assert.equal(r.lab.carregar().nome, 'Pessoa Sintetica');
    assert.match(readFileSync(resolve(r.base, '.agents/skills/sabatina-requisitos/SKILL.md'), 'utf8'), /sabatina/);
    assert.equal(r.lab.prepararJornada(2).trocouBranch, false);
    assert.throws(() => r.lab.prepararJornada(3, { trocarBranch: true }), /jornada 2, tarefa 03/);
    await assert.rejects(r.lab.encerrarJornada(2), /jornada 2, tarefa 03/);
    // Retomar uma jornada na branch certa não pode bloquear a depuração de código em edição.
    r.escrever('AGENTS.md', '# Trabalho em andamento\n');
    assert.equal(r.lab.prepararJornada(2).branch, 'main');
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});

test('evidência alterada, árvore suja e arquivos não rastreados impedem troca sem perder trabalho', async () => {
  const r = repositorio();
  try {
    await r.concluirPrimeira();
    const arquivo = '.aluno/evidencias/01.json';
    const original = readFileSync(resolve(r.base, arquivo), 'utf8');
    r.escrever(arquivo, `${original}\n`);
    assert.throws(() => r.lab.prepararJornada(2, { trocarBranch: true }), /evidência mudou/);
    assert.equal(r.git('branch', '--show-current'), 'jornada-1');
    r.escrever(arquivo, original);
    r.escrever('AGENTS.md', '# Alteração do aluno\n');
    assert.throws(() => r.lab.prepararJornada(2, { trocarBranch: true }), /Há alterações locais/);
    assert.equal(readFileSync(resolve(r.base, 'AGENTS.md'), 'utf8'), '# Alteração do aluno\n');
    r.escrever('AGENTS.md', '# Entrada compartilhada\n');
    r.escrever('anotacao.txt', 'Não descartar esta anotação.');
    assert.throws(() => r.lab.prepararJornada(2, { trocarBranch: true }), /Há alterações locais/);
    assert.equal(r.git('branch', '--show-current'), 'jornada-1');
    assert.match(readFileSync(resolve(r.base, 'anotacao.txt'), 'utf8'), /Não descartar/);
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});

test('branch docente é rejeitada; branch pessoal compatível é aceita sem checkout', async () => {
  const r = repositorio();
  try {
    await r.concluirPrimeira();
    r.git('switch', 'main');
    r.git('switch', '-c', 'professor');
    assert.throws(() => r.lab.prepararJornada(2), /Branch incompatível/);
    assert.equal(r.lab.prepararJornada(2, { trocarBranch: true }).branch, 'main');
    r.git('switch', '-c', 'atividade-do-aluno');
    assert.deepEqual(r.lab.prepararJornada(2).branch, 'atividade-do-aluno');
  } finally { rmSync(r.base, { recursive: true, force: true }); }
});

test('clone com main só remota faz transição preservando comprovantes de arquivos da branch anterior', async () => {
  const r = repositorio();
  const clone = mkdtempSync(resolve(tmpdir(), 'harness-clone-'));
  try {
    await r.concluirPrimeira(['somente-j1.md']);
    await r.lab.encerrarJornada(1);
    const gitClone = spawnSync('git', ['clone', '--branch', 'jornada-1', r.base, clone], { encoding: 'utf8' });
    assert.equal(gitClone.status, 0, gitClone.stderr);
    cpSync(resolve(r.base, '.aluno'), resolve(clone, '.aluno'), { recursive: true });
    cpSync(resolve(r.base, '.agents'), resolve(clone, '.agents'), { recursive: true });
    const lab = laboratorio(clone);
    assert.equal(lab.prepararJornada(2, { trocarBranch: true }).branch, 'main');
    assert.equal(lab.carregar().alunoId, r.lab.carregar().alunoId);
    assert.equal(lab.prepararJornada(2).branch, 'main');
  } finally {
    rmSync(r.base, { recursive: true, force: true });
    rmSync(clone, { recursive: true, force: true });
  }
});
