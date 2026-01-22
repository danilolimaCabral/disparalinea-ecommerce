import CategoryPage from "./CategoryPage";

export default function TabletsCategory() {
  return (
    <CategoryPage
      categorySlug="tablets"
      title={{
        en: "Tablets",
        pt: "Tablets",
      }}
      description={{
        en: "Powerful tablets for work and entertainment. Perfect balance of portability and performance.",
        pt: "Tablets poderosos para trabalho e entretenimento. Equilíbrio perfeito entre portabilidade e desempenho.",
      }}
    />
  );
}
