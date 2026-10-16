import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID, createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { conquistas, master, trofeu } from './trofeus.mjs';
import { verificarTarefa } from './verificacoes.mjs';

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
  function evidencia(id) {
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
      assert.ok(existsSync(resolve(base, arquivo)), `Arquivo inexistente: ${arquivo}`);
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
  return { iniciar, carregar, premiar, emitirMaster, painel, marco };
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
      default: throw new Error('Comandos: iniciar NOME | status | marco TEXTO | premiar NN | master | painel');
    }
    console.log(saida);
  } catch (erro) {
    console.error(`PENDÊNCIA: ${erro.message}`);
    process.exitCode = 1;
  }
}
