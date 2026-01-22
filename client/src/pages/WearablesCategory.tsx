import CategoryPage from "./CategoryPage";

export default function WearablesCategory() {
  return (
    <CategoryPage
      categorySlug="wearables"
      title={{
        en: "Wearables",
        pt: "Wearables",
      }}
      description={{
        en: "Smart watches and wearable technology. Stay connected and track your health.",
        pt: "Relógios inteligentes e tecnologia vestível. Mantenha-se conectado e monitore sua saúde.",
      }}
    />
  );
}
