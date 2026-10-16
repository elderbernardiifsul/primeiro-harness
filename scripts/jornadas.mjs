import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

export const tarefasPorJornada = { 1: ['01', '02'], 2: ['03', '04', '05'], 3: ['06', '07'] };

export function numeroJornada(valor) {
  const n = Number(valor);
  assert.ok(Number.isInteger(n) && tarefasPorJornada[n], 'Informe a jornada 1, 2 ou 3.');
  return n;
}

export function verificarBranch(base, jornada, trocar = false) {
  const git = args => spawnSync('git', args, { cwd: base, encoding: 'utf8', timeout: 15000 });
  const topo = git(['rev-parse', '--show-toplevel']);
  assert.ok(topo.status === 0 && resolve(topo.stdout.trim()) === resolve(base),
    'Execute a atividade na raiz do repositório independente.');
  const consultarBranch = () => {
    const r = git(['branch', '--show-current']);
    assert.ok(r.status === 0 && r.stdout.trim(), 'HEAD destacado: escolha uma branch antes de continuar.');
    return r.stdout.trim();
  };
  const destino = jornada === 1 ? 'jornada-1' : 'main';
  const estruturaCompativel = () => jornada === 1
    ? existsSync(resolve(base, 'ensino/jornadas/01.md')) && !existsSync(resolve(base, 'projeto/package.json'))
    : ['ensino/jornadas/02.md', 'ensino/jornadas/03.md', 'projeto/package.json', 'projeto/src/carrinho.mjs']
      .every(p => existsSync(resolve(base, p)));
  const compativel = branch => {
    if (!estruturaCompativel()) return false;
    if (branch === destino) return true;
    if (['main', 'jornada-1', 'professor'].includes(branch)) return false;
    return [destino, `origin/${destino}`].some(ref =>
      git(['merge-base', '--is-ancestor', ref, 'HEAD']).status === 0);
  };
  const anterior = consultarBranch();
  if (compativel(anterior)) return { branch: anterior, trocouBranch: false };
  assert.ok(trocar, `Branch incompatível: ${anterior}. Prepare a jornada ${jornada} com --trocar-branch para usar ${destino}.`);
  const status = git(['status', '--porcelain', '--untracked-files=normal']);
  assert.equal(status.status, 0, 'Não foi possível verificar as alterações locais.');
  assert.equal(status.stdout.trim(), '',
    'Há alterações locais. Preserve-as e peça ao aluno que resolva o estado Git antes de trocar de branch; não avance a jornada.');
  const troca = git(['switch', destino]);
  assert.equal(troca.status, 0,
    `Não foi possível trocar para ${destino}. Confira as referências (git fetch origin, se necessário). ${troca.stderr}`);
  const branch = consultarBranch();
  assert.ok(compativel(branch), `Branch ${branch} sem a estrutura da jornada ${jornada}; não inicie a atividade.`);
  return { branch, branchAnterior: anterior, trocouBranch: true };
}
