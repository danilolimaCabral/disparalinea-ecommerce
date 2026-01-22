import CategoryPage from "./CategoryPage";

export default function AccessoriesCategory() {
  return (
    <CategoryPage
      categorySlug="accessories"
      title={{
        en: "Accessories",
        pt: "Acessórios",
      }}
      description={{
        en: "Essential accessories for your devices. Cases, chargers, headphones and more.",
        pt: "Acessórios essenciais para seus dispositivos. Capas, carregadores, fones de ouvido e mais.",
      }}
    />
  );
}
