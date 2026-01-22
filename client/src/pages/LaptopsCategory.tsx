import CategoryPage from "./CategoryPage";

export default function LaptopsCategory() {
  return (
    <CategoryPage
      categorySlug="laptops"
      title={{
        en: "Laptops",
        pt: "Laptops",
      }}
      description={{
        en: "High-performance laptops for professionals and creators. Power meets portability.",
        pt: "Laptops de alto desempenho para profissionais e criadores. Potência encontra portabilidade.",
      }}
    />
  );
}
