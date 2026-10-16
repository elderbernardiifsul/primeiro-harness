import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { laboratorio, raiz } from '../scripts/lab.mjs';

const pasta = mkdtempSync(resolve(tmpdir(), 'primeiro-harness-piloto-'));
const clone = resolve(pasta, 'clone');
const checks = [];
function comando(cmd, args, cwd = clone, esperado = 0) {
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', timeout: 30000 });
  if (esperado === 0) assert.equal(r.status, 0, `${cmd} ${args.join(' ')}\n${r.stdout}\n${r.stderr}`);
  else assert.notEqual(r.status, 0, 'Esperava falha no estado defeituoso.');
  return `${r.stdout}${r.stderr}`;
}
const escrever = (arquivo, texto) => {
  mkdirSync(resolve(clone, arquivo, '..'), { recursive: true });
  writeFileSync(resolve(clone, arquivo), texto);
};
const copiar = (origem, destino) => {
  mkdirSync(resolve(clone, destino, '..'), { recursive: true });
  copyFileSync(resolve(raiz, origem), resolve(clone, destino));
};
const evidencia = id => escrever(`.aluno/evidencias/${id}.json`, JSON.stringify({
  resposta: `Aluno sintético explicou a causa e os limites da tarefa ${id}.`,
  proposta: 'Preservar o requisito vigente e corrigir o artefato responsável.',
  feedback: 'Registro sintético de teste automatizado; não é avaliação de aprendizagem.',
  antes: 'Verificação automatizada do estado inicial e da consequência esperada.',
  depois: 'Verificação automatizada do estado corrigido e dos casos de aceitação.',
  observacao: 'Distinguiu uma saída formatada de uma API monetária correta.',
  arquivos: ['AGENTS.md'],
  criteriosConfirmados: ['Limite inclusivo após desconto e arredondamento.', 'Carrinho vazio não paga frete nem gera total.', 'Entradas inválidas continuam sendo rejeitadas.'],
}, null, 2));

try {
  comando('git', ['clone', '--quiet', '--branch', 'jornada-1', raiz, clone], pasta);
  const lab = laboratorio(clone);
  assert.throws(() => lab.carregar(), /Sem memória/);
  lab.iniciar('Pessoa Sintetica de Validacao');
  evidencia('01'); await lab.premiar('01');
  evidencia('02');
  await assert.rejects(lab.premiar('02'), /ENOENT/);
  copiar('professor/modelos/sabatina-requisitos/SKILL.md', '.agents/skills/sabatina-requisitos/SKILL.md');
  await lab.premiar('02');
  const identidade = lab.carregar().alunoId;
  checks.push('J1: memória, evidências e bloqueio de skill ausente.');

  comando('git', ['switch', 'main']);
  assert.equal(lab.carregar().alunoId, identidade);
  assert.ok(lab.carregar().conquistas['02']);
  assert.ok(existsSync(resolve(clone, '.agents/skills/sabatina-requisitos/SKILL.md')));
  assert.match(comando('node', ['scripts/professor.mjs', 'pistas']), /Pistas graduais/);
  assert.equal(comando('git', ['branch', '--show-current']).trim(), 'main');
  checks.push('Troca real de branch preserva nome, ID, conquistas e skill; guia via origin/professor sem checkout.');

  const cen1 = JSON.parse(comando('node', ['scripts/cenarios.mjs', 'contradicao']));
  assert.equal(cen1.peloResumo, 80); assert.equal(cen1.peloContrato, 90);
  assert.equal(JSON.parse(comando('node', ['scripts/cenarios.mjs', 'rota'])).resultadoPelaRota, 95);
  comando('node', ['--test', 'tests/smoke.test.mjs'], resolve(clone, 'projeto'));
  comando('node', ['--test', 'tests/*.test.mjs'], resolve(clone, 'projeto'), 1);
  assert.equal(JSON.parse(comando('node', ['scripts/cenarios.mjs', 'moeda'])).corresponde, false);
  checks.push('Estado inicial: 80/90, rota 95/90, smoke verde, suíte vermelha e bug monetário.');

  evidencia('03'); await assert.rejects(lab.premiar('03'), /contrato vigente|porcentagem/);
  escrever('projeto/AGENTS.md', '# Carrinho\n\nRegras: docs/requisitos.md é a fonte de verdade vigente.\n\n## Conclusão\n\nExecute npm test e analise as falhas antes de concluir.\n');
  await lab.premiar('03');
  evidencia('04'); await assert.rejects(lab.premiar('04'), /primeiro destino/);
  escrever('projeto/docs/INDEX.md', '# Índice\n\n- [Contrato vigente](requisitos.md)\n- [Histórico](arquivo/contrato-v0.md)\n');
  await lab.premiar('04');
  assert.equal(JSON.parse(comando('node', ['scripts/cenarios.mjs', 'rota'])).resultadoPelaRota, 90);
  evidencia('05'); await assert.rejects(lab.premiar('05'), /suíte completa/);
  const pkg = JSON.parse(readFileSync(resolve(clone, 'projeto/package.json'), 'utf8'));
  pkg.scripts.test = 'node --test tests/*.test.mjs'; escrever('projeto/package.json', JSON.stringify(pkg));
  await assert.rejects(lab.premiar('05'), /Testes falharam/);
  const original = readFileSync(resolve(clone, 'projeto/src/carrinho.mjs'), 'utf8');
  const descontoCorreto = original.replace('return subtotal(itens) * 0.8;', 'return Math.round(subtotal(itens) * 90) / 100;');
  escrever('projeto/src/carrinho.mjs', descontoCorreto);
  await lab.premiar('05');
  checks.push('03–05: bloqueios por causa ainda presente, contrato e rota corrigidos, suíte verde.');

  evidencia('06'); await assert.rejects(lab.premiar('06'), /Implemente checkout/);
  // Funcionalidade pronta, mantendo o subtotal defeituoso para a depuração seguinte.
  const checkout = `\nexport function checkout(itens) {
    const bruto = subtotal(itens);
    const produtos = totalComDesconto(itens);
    const frete = bruto === 0 || produtos >= 200 ? 0 : 15;
    return { subtotal: bruto, desconto: Math.round((bruto-produtos)*100)/100,
      totalProdutos: produtos, frete, total: Math.round((produtos+frete)*100)/100 };
  }\n`;
  escrever('projeto/src/carrinho.mjs', descontoCorreto + checkout);
  copiar('professor/modelos/frete.test.mjs', 'projeto/tests/frete.test.mjs');
  escrever('projeto/src/cli.mjs', "import { checkout } from './carrinho.mjs';\nconsole.log(JSON.stringify(checkout([{nome:'Livro',preco:100,quantidade:1}])));\n");
  await lab.premiar('06');
  evidencia('07');
  copiar('professor/modelos/moeda.test.mjs', 'projeto/tests/moeda.test.mjs');
  const vermelho = comando('node', ['--test', 'tests/moeda.test.mjs'], resolve(clone, 'projeto'), 1);
  assert.match(vermelho, /0\.30000000000000004/);
  await assert.rejects(lab.premiar('07'), /Testes falharam|representação monetária/);
  copiar('professor/modelos/carrinho.mjs', 'projeto/src/carrinho.mjs');
  await lab.premiar('07');
  checks.push('06–07: frete e fronteiras; regressão monetária vermelha antes e verde após correção em centavos.');

  const trofeu = await lab.emitirMaster();
  assert.match(trofeu, /MASTER OF THE PROMPTS/);
  assert.match(trofeu, /Pessoa Sintetica de Validacao/);
  assert.match(trofeu, /uma descoberta do seu percurso/);
  const selo = lab.carregar().conquistas.MASTER.selo;
  assert.equal((await lab.emitirMaster()).includes(selo), true);
  assert.equal(Object.keys(lab.carregar().conquistas).length, 8);
  assert.match(lab.painel(), /CACADOR DE BUGS/);
  const e01 = resolve(clone, '.aluno/evidencias/01.json');
  const salvo = readFileSync(e01, 'utf8');
  writeFileSync(e01, `${salvo}\n`);
  await assert.rejects(lab.emitirMaster(), /mudou após/);
  writeFileSync(e01, salvo);
  escrever('projeto/src/carrinho.mjs', descontoCorreto + checkout);
  await assert.rejects(lab.emitirMaster(), /Testes falharam|representação monetária/);
  checks.push('MASTER: sete pré-requisitos, personalização, selo estável, painel, hash e revalidação bloqueiam regressão.');

  for (const check of checks) console.log(`OK: ${check}`);
  console.log('VALIDAÇÃO CONCLUÍDA. Clone temporário removido; exercício original intacto.');
} finally {
  rmSync(pasta, { recursive: true, force: true });
}
