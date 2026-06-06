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
export const emptyAndUnitaryData = {
  title: "Conjunto vazio, unitário e com vários elementos",
  explanation:
    "Um conjunto pode não ter nenhum elemento, ter apenas um elemento ou ter vários elementos. Isso depende da regra usada para escolher os elementos.",
  realLife: [
    "Busca sem resultado em uma loja online",
    "Lista com apenas um aluno sorteado",
    "Produtos encontrados por um filtro",
    "Livros disponíveis em uma categoria",
    "Materiais separados por tipo",
  ],
  items: [
    { id: 1, label: "1", type: "numero", value: 1 },
    { id: 2, label: "2", type: "numero", value: 2 },
    { id: 3, label: "3", type: "numero", value: 3 },
    { id: 4, label: "4", type: "numero", value: 4 },
    { id: 5, label: "5", type: "numero", value: 5 },
    { id: 6, label: "Maçã", type: "fruta", emoji: "🍎" },
    { id: 7, label: "Lápis", type: "material", emoji: "✏️" },
    { id: 8, label: "Caderno", type: "material", emoji: "📓" },
    { id: 9, label: "Bola", type: "objeto", emoji: "⚽" },
  ],
  filters: [
    {
      id: "greater-than-10",
      label: "Números maiores que 10",
      resultType: "empty",
      explanation:
        "Nenhum número da lista é maior que 10. Por isso, o resultado é um conjunto vazio.",
    },
    {
      id: "less-than-2",
      label: "Números menores que 2",
      resultType: "unitary",
      explanation:
        "Apenas o número 1 é menor que 2. Por isso, o resultado é um conjunto unitário.",
    },
    {
      id: "greater-than-3",
      label: "Números maiores que 3",
      resultType: "multiple",
      explanation:
        "Os números 4 e 5 são maiores que 3. Por isso, o conjunto tem vários elementos.",
    },
    {
      id: "only-fruits",
      label: "Elementos que são frutas",
      resultType: "unitary",
      explanation:
        "Apenas a maçã é fruta nesta lista. Por isso, o resultado é um conjunto unitário.",
    },
    {
      id: "school-materials",
      label: "Materiais escolares",
      resultType: "multiple",
      explanation:
        "Lápis e caderno são materiais escolares. Por isso, o conjunto tem vários elementos.",
    },
  ],
};

export function applyEmptyAndUnitaryFilter(filterId, items) {
  if (filterId === "greater-than-10") {
    return items.filter((item) => item.type === "numero" && item.value > 10);
  }

  if (filterId === "less-than-2") {
    return items.filter((item) => item.type === "numero" && item.value < 2);
  }

  if (filterId === "greater-than-3") {
    return items.filter((item) => item.type === "numero" && item.value > 3);
  }

  if (filterId === "only-fruits") {
    return items.filter((item) => item.type === "fruta");
  }

  if (filterId === "school-materials") {
    return items.filter((item) => item.type === "material");
  }

  return [];
}
