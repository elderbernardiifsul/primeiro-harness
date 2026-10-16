import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { raiz } from './lab.mjs';
import { verificarHarness } from './verificar-harness.mjs';

const erros = [];
let arquivos = 0;
function visitar(pasta) {
  for (const entrada of readdirSync(pasta, { withFileTypes: true })) {
    if (['.git', '.aluno', '.agents', 'node_modules'].includes(entrada.name)) continue;
    const caminho = resolve(pasta, entrada.name);
    if (entrada.isDirectory()) visitar(caminho);
    else {
      arquivos++;
      if (extname(caminho) !== '.md') continue;
      // Exemplos dentro de blocos de código não são links do documento.
      const texto = readFileSync(caminho, 'utf8').replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
      for (const match of texto.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
        const destino = match[1];
        if (/^(https?:|mailto:|#)/.test(destino)) continue;
        const local = decodeURIComponent(destino.split('#')[0]);
        if (!existsSync(resolve(dirname(caminho), local))) erros.push(`${caminho}: link inexistente ${destino}`);
      }
    }
  }
}
visitar(raiz);
erros.push(...verificarHarness(raiz));
for (const arquivo of ['AGENTS.md', 'CLAUDE.md', '.github/copilot-instructions.md', 'ensino/TUTOR.md']) {
  if (!existsSync(resolve(raiz, arquivo))) erros.push(`Entrada ausente: ${arquivo}`);
}
if (erros.length) { console.error(erros.join('\n')); process.exitCode = 1; }
else console.log(`OK: ${arquivos} arquivos inspecionados; links Markdown locais e entradas existentes.`);
