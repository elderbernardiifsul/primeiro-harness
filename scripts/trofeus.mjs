export const conquistas = [
  ['01', 'APRENDIZ DO CONTEXTO', 'Separou arquivo, instrucao e contexto.', [
    '          .-----------.          ', '         /   .-----.   \\         ',
    '        |   /  (*)  \\   |        ', '        |   \\       /   |        ',
    '         \\   `-----\'   /         ', '          `----. .----\'          ',
    '               | |               ', '            ___|_|___            ',
  ]],
  ['02', 'FORJADOR DE SKILLS', 'Forjou um procedimento e o colocou a prova.', [
    '               ______            ', '          ____/_____/|           ',
    '         |________| /     *      ', '             ||         *        ',
    '             ||      ______      ', '          ___||_____/_____ /     ',
    '         /________________/      ', '             |______|            ',
  ]],
  ['03', 'DETETIVE DAS CONTRADICOES', 'Encontrou duas regras e preservou a vigente.', [
    '             .--------.          ', '            /   ?  !   \\         ',
    '           |    10/20   |        ', '            \\          /         ',
    '             `--------\'\\        ', '                        \\       ',
    '                         \\      ', '                          \\     ',
  ]],
  ['04', 'GUARDIAO DO CONTEXTO', 'Abriu o caminho para a fonte correta.', [
    '             /\\                  ', '            /  \\                 ',
    '        ___/ /\\ \\___            ', '        \\   \\/   /              ',
    '         \\  ||  /               ', '          \\ || /                ',
    '           \\||/                 ', '            \\/                  ',
  ]],
  ['05', 'SENTINELA DA EVIDENCIA', 'Trocou falsa confianca por verificacao.', [
    '          ______________         ', '         /              \\        ',
    '        |    [ PASS ]    |       ', '        |      __/       |       ',
    '        |   __/          |       ', '         \\              /        ',
    '          \\____________/         ', '              |____|             ',
  ]],
  ['06', 'ARQUITETO DA ENTREGA', 'Entregou requisito, limites e regressao.', [
    '                 /\\              ', '                /__\\             ',
    '               /|  |\\            ', '              /_|__|_\\           ',
    '             |  |  |  |          ', '             |__|__|__|          ',
    '            /__________\\         ', '           /____________\\        ',
  ]],
  ['07', 'CACADOR DE BUGS', 'Reproduziu, explicou e eliminou o defeito.', [
    '             \\  |  /             ', '           --- .--. ---          ',
    '              / oo \\             ', '          ---|  XX  |---          ',
    '              \\__/               ', '             / || \\              ',
    '              _||_               ', '           __/____\\__            ',
  ]],
];

export function trofeu({ id, titulo, merito, arte }, nome, selo) {
  const largura = Math.max(56, [...nome].length + 10);
  const linha = (s = '') => `| ${s.padEnd(largura)} |`;
  const borda = `+${'-'.repeat(largura + 2)}+`;
  return [borda, linha('PRIMEIRO HARNESS - GALERIA DE CONQUISTAS'), linha(),
    ...arte.map(linha), linha(), linha(titulo), linha(`Aluno: ${nome}`),
    linha(`Conquista: ${id}`), linha(`Selo: ${selo}`), linha(),
    linha(merito), borda, ''].join('\n');
}

export const master = {
  id: 'MASTER', titulo: 'MASTER OF THE PROMPTS',
  merito: 'Investigou. Questionou. Construiu. Comprovou.',
  arte: [
    '                 .      *      .                 ',
    '                     _/\\_                       ',
    '                _/\\/    \\/\\_                  ',
    '                \\            /                  ',
    '                 \\__________/                   ',
    '                   | M    P |                    ',
    '             ______|________|______              ',
    '          __/                      \\__           ',
    '         /  |      7  /  7         |  \\          ',
    '        |   |    CONQUISTADAS      |   |         ',
    '         \\__|                     |__/          ',
    '            \\                     /             ',
    '             \\___________________/              ',
    '                    |     |                      ',
    '                 ___|_____|___                   ',
    '                /             \\                  ',
    '               / HARNESS MASTER\\                 ',
    '              /_________________\\                ',
  ],
};
