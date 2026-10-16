import { spawnSync } from 'node:child_process';
import { raiz } from './lab.mjs';

const secao = process.argv[2] ?? 'pistas';
if (!['pistas', 'solucoes', 'guia'].includes(secao)) {
  console.error('Use pistas, solucoes ou guia.');
  process.exitCode = 1;
} else {
  const arquivo = `professor/${secao}.md`;
  let resultado;
  for (const branch of ['professor', 'origin/professor']) {
    resultado = spawnSync('git', ['show', `${branch}:${arquivo}`], { cwd: raiz, encoding: 'utf8' });
    if (resultado.status === 0) break;
  }
  if (resultado.status === 0) console.log(resultado.stdout);
  else {
    console.error('Guia docente indisponível. No clone publicado, execute git fetch origin e tente novamente. Não troque a branch da atividade.');
    process.exitCode = 1;
  }
}
