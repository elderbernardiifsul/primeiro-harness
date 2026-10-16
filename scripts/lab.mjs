import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID, createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { conquistas, master, trofeu } from './trofeus.mjs';
import { verificarTarefa } from './verificacoes.mjs';
import { tarefasPorJornada, numeroJornada, verificarBranch } from './jornadas.mjs';

export const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export function laboratorio(base = raiz) {
  const pasta = resolve(base, '.aluno');
  const memoria = resolve(pasta, 'progresso.json');
  const carregar = () => {
    assert.ok(existsSync(memoria), 'Sem memória local. Pergunte o nome antes de iniciar.');
    return JSON.parse(readFileSync(memoria, 'utf8'));
  };
  const salvar = dados => {
    mkdirSync(pasta, { recursive: true });
    writeFileSync(`${memoria}.tmp`, `${JSON.stringify(dados, null, 2)}\n`);
    renameSync(`${memoria}.tmp`, memoria);
  };
  const texto = (caminho, conteudo) => {
    mkdirSync(dirname(caminho), { recursive: true });
    writeFileSync(caminho, conteudo);
  };
  function iniciar(nome) {
    assert.ok(!existsSync(memoria), 'Memória já existe; use status para retomar.');
    assert.equal(typeof nome, 'string', 'Informe o nome de exibição.');
    nome = nome.trim().normalize('NFC');
    assert.ok(nome.length > 0 && [...nome].length <= 64 && !/[\x00-\x1f\x7f-\x9f]/u.test(nome), 'Nome inválido.');
    const dados = { versao: 1, nome, alunoId: randomUUID(), marco: 'J1: primeira pergunta conceitual', conquistas: {} };
    salvar(dados);
    return `Memória local criada para ${nome}.`;
  }
  function evidencia(id, { exigirArquivos = true } = {}) {
    const conteudo = readFileSync(resolve(pasta, 'evidencias', `${id}.json`), 'utf8');
    const e = JSON.parse(conteudo);
    for (const campo of ['resposta', 'proposta', 'feedback', 'antes', 'depois', 'observacao']) {
      assert.ok(typeof e[campo] === 'string' && e[campo].trim().length >= 12,
        `Registre ${campo} com evidência real (mínimo de 12 caracteres).`);
    }
    assert.ok(Array.isArray(e.arquivos) && e.arquivos.length > 0, 'Indique arquivos consultados.');
    for (const arquivo of e.arquivos) {
      assert.equal(typeof arquivo, 'string');
      const rel = relative(base, resolve(base, arquivo));
      assert.ok(rel && !rel.startsWith('..') && !isAbsolute(rel), 'Use arquivos dentro do laboratório.');
      if (exigirArquivos) assert.ok(existsSync(resolve(base, arquivo)), `Arquivo inexistente: ${arquivo}`);
    }
    return { e, hash: createHash('sha256').update(conteudo).digest('hex') };
  }
  function renderizar(dados, id) {
    const registro = dados.conquistas[id];
    const c = id === 'MASTER' ? master : (() => {
      const [numero, titulo, merito, arte] = conquistas.find(c => c[0] === id);
      return { id: `${numero} / 07`, titulo, merito, arte };
    })();
    const desenho = trofeu(c, dados.nome, registro.selo);
    texto(resolve(pasta, 'insignias', `${id}.txt`), desenho);
    return desenho;
  }
  async function premiar(id) {
    assert.ok(conquistas.some(c => c[0] === id), 'Use um ID de 01 a 07.');
    const dados = carregar();
    if (dados.conquistas[id]) return renderizar(dados, id);
    const anterior = String(Number(id) - 1).padStart(2, '0');
    assert.ok(id === '01' || dados.conquistas[anterior], `Conclua a tarefa ${anterior} primeiro.`);
    const { e, hash } = evidencia(id);
    const verificacoes = await verificarTarefa(base, id, e);
    dados.conquistas[id] = {
      selo: `PH-${id}-${randomUUID().slice(0, 8).toUpperCase()}`,
      emitidaEm: new Date().toISOString(), evidenciaSha256: hash, verificacoes,
    };
    dados.marco = `Tarefa ${id} concluída; aguardar autorização do aluno para seguir.`;
    salvar(dados);
    return renderizar(dados, id);
  }
  async function emitirMaster() {
    const dados = carregar();
    for (const [id] of conquistas) {
      assert.ok(dados.conquistas[id], `Falta a conquista ${id}.`);
      const { e, hash } = evidencia(id);
      assert.equal(hash, dados.conquistas[id].evidenciaSha256, `Evidência ${id} mudou após a emissão; revise com o tutor.`);
      await verificarTarefa(base, id, e);
    }
    dados.conquistas.MASTER ??= { selo: `PH-MASTER-${randomUUID().slice(0, 8).toUpperCase()}`, emitidaEm: new Date().toISOString() };
    dados.marco = 'Atividade concluída; entregar prints e preservar evidências.';
    salvar(dados);
    const observacao = evidencia('07').e.observacao;
    const mensagem = `\n${dados.nome}, uma descoberta do seu percurso: ${observacao}\n`;
    return renderizar(dados, 'MASTER') + mensagem;
  }
  function painel() {
    const dados = carregar();
    const ids = [...conquistas.map(c => c[0]), 'MASTER'].filter(id => dados.conquistas[id]);
    const conteudo = ids.length ? ids.map(id => renderizar(dados, id)).join('\n') : 'Nenhuma conquista emitida. Retome a primeira tarefa.\n';
    texto(resolve(pasta, 'insignias', 'PAINEL.txt'), conteudo);
    return conteudo;
  }
  function marco(s) {
    assert.ok(typeof s === 'string' && s.trim().length > 0, 'Informe o próximo ponto.');
    const dados = carregar(); dados.marco = s; salvar(dados); return s;
  }
  function conferirConclusao(dados, jornadas) {
    for (const jornada of jornadas) {
      for (const id of tarefasPorJornada[jornada]) {
        assert.ok(dados.conquistas[id],
          `Sequência incompleta: retome primeiro a jornada ${jornada}, tarefa ${id}. Abra uma nova sessão e envie começar jornada ${jornada}.`);
        let registro;
        // Um comprovante pode citar arquivos presentes apenas na branch da etapa concluída.
        try { registro = evidencia(id, { exigirArquivos: false }); }
        catch (erro) { throw new Error(`Retome a jornada ${jornada}, tarefa ${id}: ${erro.message}`); }
        assert.equal(registro.hash, dados.conquistas[id].evidenciaSha256,
          `Retome a jornada ${jornada}, tarefa ${id}: a evidência mudou após a conquista. Revise com o tutor antes de avançar.`);
      }
    }
  }
  function prepararJornada(valor, { trocarBranch = false } = {}) {
    const n = numeroJornada(valor);
    assert.ok(n === 1 || existsSync(memoria),
      'Sequência incompleta: comece primeiro a jornada 1 em uma nova sessão para registrar seu nome e realizar as tarefas iniciais.');
    const dados = carregar();
    // Pré-requisitos são verificados antes de qualquer troca de branch.
    conferirConclusao(dados, Array.from({ length: n - 1 }, (_, i) => i + 1));
    const branch = verificarBranch(base, n, trocarBranch);
    const retomada = carregar();
    assert.equal(retomada.alunoId, dados.alunoId, 'Memória do aluno mudou durante a transição. Não avance.');
    conferirConclusao(retomada, Array.from({ length: n - 1 }, (_, i) => i + 1));
    return {
      jornada: n, ...branch,
      orientacao: branch.trocouBranch
        ? `Branch preparada. Encerre esta sessão, abra uma nova e envie começar jornada ${n}. Não inicie a jornada nesta sessão.`
        : `Verificação aprovada para a jornada ${n}. Se veio de outra jornada, abra uma sessão nova antes de iniciar.`,
    };
  }
  async function encerrarJornada(valor) {
    const n = numeroJornada(valor);
    const dados = carregar();
    conferirConclusao(dados, Array.from({ length: n }, (_, i) => i + 1));
    verificarBranch(base, n);
    const ultima = tarefasPorJornada[n].at(-1);
    await verificarTarefa(base, ultima, evidencia(ultima).e);
    if (n === 3) assert.ok(dados.conquistas.MASTER, 'Emita o master antes de encerrar a jornada 3.');
    dados.jornadasConcluidas ??= {};
    dados.jornadasConcluidas[n] = { concluidaEm: new Date().toISOString() };
    dados.marco = n < 3
      ? `Jornada ${n} concluída. Preparar branch e abrir nova sessão para começar jornada ${n + 1}.`
      : 'Atividade concluída; entregar prints e preservar evidências.';
    salvar(dados);
    return n < 3
      ? `Jornada ${n} concluída e verificada. Sugira abrir uma nova sessão para a jornada ${n + 1}. Se o aluno aceitar, execute preparar ${n + 1} --trocar-branch, confirme o resultado e pare: não inicie o conteúdo na sessão atual.`
      : 'Jornada 3 concluída e verificada. Mostre o painel e oriente a entrega.';
  }
  return { iniciar, carregar, premiar, emitirMaster, painel, marco, prepararJornada, encerrarJornada };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const lab = laboratorio();
  const [comando, ...args] = process.argv.slice(2);
  try {
    let saida;
    switch (comando) {
      case 'iniciar': saida = lab.iniciar(args.join(' ')); break;
      case 'status': saida = JSON.stringify(lab.carregar(), null, 2); break;
      case 'marco': saida = lab.marco(args.join(' ')); break;
      case 'premiar': saida = await lab.premiar(args[0]); break;
      case 'master': saida = await lab.emitirMaster(); break;
      case 'painel': saida = lab.painel(); break;
      case 'preparar':
        assert.ok(args.length <= 2 && (!args[1] || args[1] === '--trocar-branch'), 'Use preparar N [--trocar-branch].');
        saida = JSON.stringify(lab.prepararJornada(args[0], { trocarBranch: args[1] === '--trocar-branch' }), null, 2);
        break;
      case 'encerrar': saida = await lab.encerrarJornada(args[0]); break;
      default: throw new Error('Comandos: iniciar NOME | status | marco TEXTO | premiar NN | master | painel | preparar N [--trocar-branch] | encerrar N');
    }
    console.log(saida);
  } catch (erro) {
    console.error(`PENDÊNCIA: ${erro.message}`);
    process.exitCode = 1;
  }
}
