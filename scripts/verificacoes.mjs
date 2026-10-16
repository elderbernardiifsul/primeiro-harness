import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

export const ler = (raiz, caminho) => readFileSync(resolve(raiz, caminho), 'utf8');

export function executarTestes(raiz, completo = true) {
  const args = completo ? ['--test', 'tests/*.test.mjs'] : ['--test', 'tests/smoke.test.mjs'];
  // Node >=22 expande o glob de --test; não depende do shell ou do npm do SO.
  // Um verificador chamado por node:test precisa de um runner independente:
  // NODE_TEST_CONTEXT herdado faz o filho pular os testes e pode retornar zero.
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const saida = spawnSync(process.execPath, args, {
    cwd: resolve(raiz, 'projeto'), encoding: 'utf8', timeout: 15000, env,
  });
  assert.equal(saida.status, 0, `Testes falharam:\n${saida.stdout}\n${saida.stderr}`);
  return saida.stdout;
}

export async function verificarTarefa(raiz, id, evidencia) {
  const ok = [];
  if (id === '01') return ['Mapa de contexto registrado; compreensão avaliada pelo tutor.'];
  if (id === '02') {
    const caminho = '.agents/skills/sabatina-requisitos/SKILL.md';
    const skill = ler(raiz, caminho);
    assert.match(skill, /^---\r?\nname: sabatina-requisitos\r?\n/);
    assert.match(skill, /\ndescription: .{20,}/);
    assert.ok(skill.split(/^---\s*$/m).length >= 3, 'Feche o frontmatter.');
    assert.ok(skill.length >= 350, 'Discuta e escreva o procedimento da skill.');
    assert.ok(Array.isArray(evidencia.criteriosConfirmados) &&
      evidencia.criteriosConfirmados.length >= 3 &&
      evidencia.criteriosConfirmados.every(s => typeof s === 'string' && s.trim().length >= 15),
    'Registre pelo menos três critérios confirmados pelo aluno.');
    return ['Skill com metadados e corpo; comparação e não ativação registradas pelo tutor.'];
  }
  assert.ok(existsSync(resolve(raiz, 'projeto/package.json')), 'Troque para main antes desta tarefa.');
  if (Number(id) >= 3) {
    const guia = ler(raiz, 'projeto/AGENTS.md');
    assert.ok(guia.includes('docs/requisitos.md'), 'Referencie o contrato vigente no guia do projeto.');
    assert.doesNotMatch(guia, /\d+\s*%/, 'Não mantenha uma porcentagem duplicada no guia operacional.');
    assert.match(ler(raiz, 'projeto/docs/requisitos.md'), /10%/, 'Preserve o contrato vigente.');
    ok.push('Regra centralizada no contrato vigente.');
  }
  if (Number(id) >= 4) {
    const indice = ler(raiz, 'projeto/docs/INDEX.md');
    const primeiro = indice.match(/\[[^\]]+\]\(([^)]+)\)/)?.[1];
    assert.ok(['requisitos.md', './requisitos.md'].includes(primeiro),
      'O primeiro destino do índice deve ser o contrato vigente.');
    assert.match(indice, /hist[oó]ric[oa]/i, 'Identifique a referência antiga como histórica.');
    ok.push('Índice encaminha primeiro ao contrato vigente e identifica histórico.');
  }
  if (Number(id) >= 5) {
    const pkg = JSON.parse(ler(raiz, 'projeto/package.json'));
    assert.equal(pkg.scripts.test, 'node --test tests/*.test.mjs',
      'npm test deve executar a suíte completa deste laboratório.');
    const guia = ler(raiz, 'projeto/AGENTS.md');
    assert.ok(guia.includes('npm test'), 'Documente a verificação completa.');
    // Detecte o parágrafo semeado intocado, não palavras que também aparecem
    // em negações corretas. Isso não interpreta outras redações do guia.
    const orientacaoOriginal = 'Apenas o smoke é suficiente para considerar qualquer mudança concluída. Não é necessário rodar a suíte completa.';
    assert.ok(!guia.replace(/\s+/g, ' ').includes(orientacaoOriginal),
      'Substitua a orientação original de conclusão para exigir a suíte completa.');
    // Valide também o escopo real do comando e o resultado da execução.
    // A coerência de outras redações e a compreensão cabem ao tutor.
    executarTestes(raiz);
    ok.push('Comando padrão completo e suíte passando.');
  }
  if (Number(id) >= 6) {
    const api = await import(`${pathToFileURL(resolve(raiz, 'projeto/src/carrinho.mjs'))}?v=${Date.now()}`);
    assert.equal(typeof api.checkout, 'function', 'Implemente checkout.');
    for (const [preco, esperadoFrete, esperadoTotal] of [
      [100, 15, 105], [200, 15, 195], [222.21, 15, 214.99], [222.22, 0, 200], [222.23, 0, 200.01], [300, 0, 270],
    ]) {
      const itens = [{ nome: 'Item', preco, quantidade: 1 }];
      const copia = structuredClone(itens);
      const resultado = api.checkout(itens);
      const produtos = Math.round(preco * 90) / 100;
      assert.deepEqual(resultado, {
        subtotal: preco,
        desconto: Math.round((preco - produtos) * 100) / 100,
        totalProdutos: produtos,
        frete: esperadoFrete,
        total: esperadoTotal,
      }, `Contrato de checkout incorreto para preço ${preco}.`);
      assert.deepEqual(itens, copia, 'Não modifique as entradas.');
    }
    assert.deepEqual(api.checkout([]), { subtotal: 0, desconto: 0, totalProdutos: 0, frete: 0, total: 0 },
      'Carrinho vazio deve retornar todos os campos zero.');
    assert.throws(() => api.checkout([{ nome: 'Inválido', preco: 10, quantidade: 0 }]));
    assert.ok(existsSync(resolve(raiz, 'projeto/tests/frete.test.mjs')), 'Crie os testes de frete.');
    const cli = spawnSync(process.execPath, ['src/cli.mjs'], {
      cwd: resolve(raiz, 'projeto'), encoding: 'utf8', timeout: 15000,
    });
    assert.equal(cli.status, 0, 'O CLI deve executar sem erro.');
    const demonstracao = JSON.parse(cli.stdout);
    for (const campo of ['subtotal', 'desconto', 'totalProdutos', 'frete', 'total']) {
      assert.ok(Number.isFinite(demonstracao[campo]), `O CLI deve demonstrar o campo ${campo} do checkout em JSON.`);
    }
    ok.push('Aceitação independente do frete: limites após desconto, vazio e entrada inválida.');
    if (Number(id) >= 7) {
      const itens = [{ nome: 'A', preco: 0.1, quantidade: 1 }, { nome: 'B', preco: 0.2, quantidade: 1 }];
      assert.equal(api.subtotal(itens), 0.3, 'Corrija a representação monetária do subtotal.');
      assert.equal(api.totalComDesconto(itens), 0.27);
      assert.equal(api.checkout(itens).total, 15.27);
      assert.ok(existsSync(resolve(raiz, 'projeto/tests/moeda.test.mjs')), 'Crie o teste de regressão monetária.');
      executarTestes(raiz);
      ok.push('Regressão monetária e suíte completa passando.');
    }
  }
  return ok;
}
