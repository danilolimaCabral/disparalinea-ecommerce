import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Globe, Shield, TrendingUp } from "lucide-react";

export default function AboutUs() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About DisparaLinea Trading",
      subtitle: "Your Trusted Partner in Premium Technology and Products",
      intro:
        "DisparaLinea Trading LDA is a leading European distributor of premium technology products, tires, and fragrances. Since our establishment, we've been committed to delivering excellence and innovation to our customers across Europe.",
      mission: "Our Mission",
      missionText:
        "To provide customers with access to the world's best products at competitive prices, backed by exceptional service and expertise.",
      values: "Our Values",
      quality: "Quality First",
      qualityText: "We source only authentic products from authorized distributors and manufacturers.",
      innovation: "Innovation",
      innovationText: "Staying ahead with the latest technology and trends to serve you better.",
      trust: "Trust & Transparency",
      trustText: "Building long-term relationships through honest business practices.",
      growth: "Continuous Growth",
      growthText: "Expanding our product range and services to meet evolving customer needs.",
    },
    pt: {
      title: "Sobre a DisparaLinea Trading",
      subtitle: "Seu Parceiro Confiável em Tecnologia e Produtos Premium",
      intro:
        "A DisparaLinea Trading LDA é uma distribuidora europeia líder de produtos tecnológicos premium, pneus e perfumes. Desde o nosso estabelecimento, temos nos comprometido a entregar excelência e inovação aos nossos clientes em toda a Europa.",
      mission: "Nossa Missão",
      missionText:
        "Fornecer aos clientes acesso aos melhores produtos do mundo a preços competitivos, apoiados por serviço e expertise excepcionais.",
      values: "Nossos Valores",
      quality: "Qualidade em Primeiro Lugar",
      qualityText: "Fornecemos apenas produtos autênticos de distribuidores e fabricantes autorizados.",
      innovation: "Inovação",
      innovationText: "Mantendo-nos à frente com a tecnologia e tendências mais recentes para servi-lo melhor.",
      trust: "Confiança & Transparência",
      trustText: "Construindo relacionamentos de longo prazo através de práticas comerciais honestas.",
      growth: "Crescimento Contínuo",
      growthText: "Expandindo nossa gama de produtos e serviços para atender às necessidades em evolução dos clientes.",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] py-20">
        <div className="container relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-gray-200 max-w-2xl">{t.subtitle}</p>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="container py-16">
        {/* Introduction */}
        <div className="glass-card p-8 rounded-2xl mb-12">
          <p className="text-lg text-gray-200 leading-relaxed">{t.intro}</p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 rounded-2xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t.mission}</h2>
          <p className="text-lg text-gray-200 leading-relaxed">{t.missionText}</p>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.values}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t.quality}</h3>
              <p className="text-gray-300">{t.qualityText}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t.innovation}</h3>
              <p className="text-gray-300">{t.innovationText}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t.trust}</h3>
              <p className="text-gray-300">{t.trustText}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-16 h-16 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t.growth}</h3>
              <p className="text-gray-300">{t.growthText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
