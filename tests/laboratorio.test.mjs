import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { laboratorio } from '../scripts/lab.mjs';

test('memória não é sobrescrita; ordem e evidência precedem premiação; reimpressão preserva selo', async () => {
  const raiz = mkdtempSync(resolve(tmpdir(), 'harness-test-'));
  try {
    const lab = laboratorio(raiz);
    assert.throws(() => lab.carregar(), /Sem memória/);
    assert.throws(() => lab.iniciar('Ana\nSilva'), /Nome inválido/);
    lab.iniciar('Aluna de Teste');
    assert.throws(() => lab.iniciar('Outro nome'), /já existe/);
    await assert.rejects(lab.premiar('02'), /01 primeiro/);
    await assert.rejects(lab.premiar('01'), /ENOENT/);
    mkdirSync(resolve(raiz, '.aluno/evidencias'), { recursive: true });
    writeFileSync(resolve(raiz, 'AGENTS.md'), '# Entrada');
    const e = {
      resposta: 'Distingui leitura explícita de contexto recebido.',
      proposta: 'Conferir as referências e as ferramentas de leitura.',
      feedback: 'A compreensão foi revisada com um contraexemplo.',
      antes: 'Hipótese inicial: todos os arquivos seriam carregados.',
      depois: 'Observação: apenas a entrada e os arquivos abertos.',
      observacao: 'O caminho do arquivo não prova seu carregamento.',
      arquivos: ['AGENTS.md'],
    };
    writeFileSync(resolve(raiz, '.aluno/evidencias/01.json'), JSON.stringify(e));
    const desenho = await lab.premiar('01');
    assert.match(desenho, /APRENDIZ DO CONTEXTO/);
    assert.match(desenho, /Aluna de Teste/);
    const selo = lab.carregar().conquistas['01'].selo;
    assert.equal(await lab.premiar('01'), desenho);
    assert.equal(lab.carregar().conquistas['01'].selo, selo);
    assert.equal(lab.painel(), desenho);
    assert.match(readFileSync(resolve(raiz, '.aluno/insignias/PAINEL.txt'), 'utf8'), /PH-01-/);
    await assert.rejects(lab.emitirMaster(), /02/);
    lab.marco('J1: aguardando a proposta da skill');
    assert.match(laboratorio(raiz).carregar().marco, /skill/);
  } finally { rmSync(raiz, { recursive: true, force: true }); }
});
