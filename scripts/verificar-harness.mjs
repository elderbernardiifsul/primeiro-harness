import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

// Compartilhados entre branches de atividade; projeto/ contém defeitos didáticos
// e .harness/{MEMORY,CHANGELOG}.md preservam a história própria de cada branch.
export const arquivosComuns = [
  'README.md', 'AGENTS.md', 'CLAUDE.md', '.github/copilot-instructions.md',
  'ensino/TUTOR.md', 'ensino/AMBIENTE.md', 'ensino/TRANSICAO.md',
  'ensino/INICIO.md', 'ensino/CONQUISTAS.md',
  'ensino/jornadas/01.md',
  'package.json', 'scripts/lab.mjs', 'scripts/jornadas.mjs',
  'scripts/verificacoes.mjs', 'scripts/verificar-repo.mjs',
  'scripts/verificar-harness.mjs', 'tests/harness.test.mjs',
  'tests/verificacoes.test.mjs',
];

export function verificarHarness(base, refs = []) {
  const erros = [];
  const git = args => spawnSync('git', args, { cwd: base, encoding: 'utf8', timeout: 15000 });
  const disponiveis = refs.filter(ref => {
    const r = git(['rev-parse', '--verify', '--end-of-options', `${ref}^{commit}`]);
    if (r.status === 0) return true;
    erros.push(`Referência indisponível: ${ref}. Confira as branches locais/remotas antes de comparar.`);
    return false;
  });
  for (const p of arquivosComuns) {
    let atual;
    try { atual = readFileSync(resolve(base, p), 'utf8'); }
    catch { erros.push(`Núcleo comum ausente: ${p}`); continue; }
    const destino = {
      'README.md': 'AGENTS.md',
      'AGENTS.md': 'ensino/TUTOR.md',
      'CLAUDE.md': 'AGENTS.md',
      '.github/copilot-instructions.md': 'AGENTS.md',
    }[p];
    if (destino && !atual.includes(destino)) erros.push(`${p} deve encaminhar para ${destino}.`);
    for (const ref of disponiveis) {
      const r = git(['show', `${ref}:${p}`]);
      if (r.status !== 0) erros.push(`${p} ausente em ${ref}.`);
      else if (r.stdout !== atual) erros.push(`${p} difere de ${ref}; sincronize o núcleo comum sem copiar projeto/.`);
    }
  }
  return erros;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const refs = process.argv.slice(2);
  const erros = verificarHarness(process.cwd(), refs);
  if (erros.length) { console.error(erros.join('\n')); process.exitCode = 1; }
  else console.log(`OK: núcleo comum presente${refs.length ? ` e idêntico em ${refs.join(', ')}` : ''}. Isso não comprova adesão do modelo ao tutor.`);
}
