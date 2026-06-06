export const tutorModes = {
  TRAINING: "treino",
  TEST: "prova",
  REVIEW: "revisao",
};

export const tutorMessages = {
  treino: {
    intro:
      "Estou no modo treino. Posso dar pistas, explicar símbolos e ajudar você a pensar sem entregar tudo de bandeja.",
    hint: "Observe o conjunto com calma. Se o número aparece dentro das chaves, ele pertence ao conjunto. Se não aparece, não pertence.",
    calm: "Respira. Matemática não é corrida. Olhe para um símbolo de cada vez e compare com o conjunto.",
    symbol:
      "O símbolo ∈ significa pertence. O símbolo ∉ significa não pertence.",
  },

  prova: {
    intro:
      "Estou no modo prova. Posso ler, acalmar e lembrar conceitos gerais, mas não posso contar a resposta.",
    hint: "No modo prova, pense assim: primeiro leia o símbolo, depois procure o elemento dentro do conjunto.",
    calm: "Respira fundo. Você não precisa acertar correndo. Leia a afirmação e observe o conjunto.",
    symbol:
      "Lembrete geral: ∈ indica que faz parte. ∉ indica que não faz parte.",
  },

  revisao: {
    intro:
      "Estou no modo revisão. Vamos entender o que aconteceu e transformar erro em pista para a próxima tentativa.",
    hint: "Revise se você confundiu o símbolo ou se não observou todos os elementos do conjunto.",
    calm: "Errar aqui é informação, não fracasso. O erro mostra exatamente onde precisamos iluminar melhor.",
    symbol:
      "Se o símbolo era ∈, a pergunta era: está dentro? Se era ∉, a pergunta era: está fora?",
  },
};

export function getTutorMessage(mode, action) {
  const selectedMode = tutorMessages[mode] || tutorMessages.treino;
  return selectedMode[action] || selectedMode.intro;
}
