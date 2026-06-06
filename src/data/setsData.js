export const setsIntroData = {
  title: "O que é um conjunto?",
  explanation:
    "Um conjunto é uma coleção de elementos reunidos por alguma característica em comum.",
  examples: [
    "Conjunto de frutas",
    "Conjunto de animais",
    "Conjunto de números pares",
    "Conjunto de livros de aventura",
  ],
  realLife: [
    "Separar roupas por cor",
    "Organizar livros por categoria",
    "Filtrar produtos em uma loja online",
    "Montar listas de alunos por turma",
    "Agrupar contatos no celular",
  ],
};

export const draggableItems = [
  { id: 1, label: "Maçã", emoji: "🍎", group: "fruta" },
  { id: 2, label: "Banana", emoji: "🍌", group: "fruta" },
  { id: 3, label: "Uva", emoji: "🍇", group: "fruta" },
  { id: 4, label: "Cachorro", emoji: "🐶", group: "animal" },
  { id: 5, label: "Bola", emoji: "⚽", group: "objeto" },
  { id: 6, label: "Número 2", emoji: "2️⃣", group: "numero" },
];
export const belongsData = {
  title: "Pertence ou não pertence?",
  explanation:
    "Quando um elemento faz parte de um conjunto, dizemos que ele pertence ao conjunto. Usamos o símbolo ∈. Quando não faz parte, usamos ∉.",
  realLife: [
    "Verificar se um aluno pertence a uma turma",
    "Saber se um produto faz parte de uma promoção",
    "Conferir se um livro pertence à categoria aventura",
    "Checar se um número pertence ao conjunto dos pares",
  ],
  setName: "A",
  setElements: [2, 4, 6, 8],
  statements: [
    {
      id: 1,
      text: "4 ∈ A",
      readable: "Quatro pertence ao conjunto A",
      isCorrect: true,
      explanation: "Correto! O número 4 está dentro do conjunto A.",
    },
    {
      id: 2,
      text: "5 ∈ A",
      readable: "Cinco pertence ao conjunto A",
      isCorrect: false,
      explanation: "Opa! O número 5 não aparece no conjunto A.",
    },
    {
      id: 3,
      text: "7 ∉ A",
      readable: "Sete não pertence ao conjunto A",
      isCorrect: true,
      explanation: "Isso mesmo! O número 7 não está no conjunto A.",
    },
    {
      id: 4,
      text: "8 ∈ A",
      readable: "Oito pertence ao conjunto A",
      isCorrect: true,
      explanation: "Perfeito! O número 8 está no conjunto A.",
    },
  ],
};
