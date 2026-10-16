import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { raiz } from './lab.mjs';
import { ler } from './verificacoes.mjs';

// Reprodutor de rotas documentais, não simulação de raciocínio de um LLM.
function descontoDoTexto(texto) {
  const valor = texto.match(/(\d+)%/);
  if (!valor) return null;
  return 100 - Number(valor[1]);
}

const caso = process.argv[2];
try {
  if (caso === 'contradicao') {
    const guia = ler(raiz, 'projeto/AGENTS.md');
    const vigente = ler(raiz, 'projeto/docs/requisitos.md');
    console.log(JSON.stringify({ entrada: 100, peloResumo: descontoDoTexto(guia), peloContrato: descontoDoTexto(vigente),
      nota: 'null significa que a cópia da porcentagem foi removida; consulte a referência.' }, null, 2));
  } else if (caso === 'rota') {
    const indice = ler(raiz, 'projeto/docs/INDEX.md');
    const destino = indice.match(/\[[^\]]+\]\(([^)]+)\)/)?.[1];
    if (!destino || !['arquivo/contrato-v0.md', 'requisitos.md', './requisitos.md'].includes(destino)) {
      throw new Error('Rota não reconhecida; inspecione o índice manualmente.');
    }
    console.log(JSON.stringify({ entrada: 100, destino,
      resultadoPelaRota: descontoDoTexto(ler(raiz, `projeto/docs/${destino}`)), esperadoVigente: 90 }, null, 2));
  } else if (caso === 'moeda') {
    const { subtotal } = await import(pathToFileURL(resolve(raiz, 'projeto/src/carrinho.mjs')));
    const obtido = subtotal([{ nome: 'A', preco: 0.1, quantidade: 1 }, { nome: 'B', preco: 0.2, quantidade: 1 }]);
    console.log(JSON.stringify({ entrada: '0.10 + 0.20', obtido, esperado: 0.3, corresponde: obtido === 0.3 }, null, 2));
  } else throw new Error('Use contradicao | rota | moeda. Os cenários observam, não corrigem.');
} catch (erro) { console.error(erro.message); process.exitCode = 1; }
