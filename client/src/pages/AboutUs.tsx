import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Globe, Shield, TrendingUp } from "lucide-react";

export default function AboutUs() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About DisparaLinea Trading",
      subtitle: "Your Trusted Partner in Premium Technology and Products",
      whoWeAre: "Who We Are",
      intro:
        "DisparaLinea Trading LDA is a leading European distributor of premium technology products, automotive tires, and luxury fragrances. Established with a vision to bridge the gap between world-class manufacturers and discerning customers, we have built a reputation for excellence, reliability, and innovation across Europe.",
      intro2:
        "Our extensive portfolio includes cutting-edge smartphones, tablets, wearables, and laptops from brands like Apple, Samsung, and Google; high-performance tires from Michelin, Bridgestone, Pirelli, and Continental; and exclusive fragrances from Dior, Chanel, Versace, and other prestigious houses.",
      mission: "Our Mission",
      missionText:
        "To provide customers with seamless access to the world's finest products at competitive prices, backed by exceptional service, expert guidance, and unwavering commitment to authenticity. We strive to make premium quality accessible to everyone while maintaining the highest standards of customer satisfaction.",
      values: "Our Values",
      quality: "Quality First",
      qualityText: "We source only authentic products from authorized distributors and manufacturers, ensuring every item meets rigorous quality standards.",
      innovation: "Innovation",
      innovationText: "Staying ahead with the latest technology and market trends, we continuously expand our offerings to serve you better.",
      trust: "Trust & Transparency",
      trustText: "Building long-term relationships through honest business practices, clear communication, and reliable after-sales support.",
      growth: "Continuous Growth",
      growthText: "Expanding our product range, improving our services, and adapting to evolving customer needs in an ever-changing market.",
    },
    pt: {
      title: "Sobre a DisparaLinea Trading",
      subtitle: "Seu Parceiro Confiável em Tecnologia e Produtos Premium",
      whoWeAre: "Quem Somos",
      intro:
        "A DisparaLinea Trading LDA é uma distribuidora europeia líder de produtos tecnológicos premium, pneus automotivos e perfumes de luxo. Estabelecida com a visão de conectar fabricantes de classe mundial a clientes exigentes, construímos uma reputação de excelência, confiabilidade e inovação em toda a Europa.",
      intro2:
        "Nosso extenso portfólio inclui smartphones de última geração, tablets, wearables e laptops de marcas como Apple, Samsung e Google; pneus de alta performance da Michelin, Bridgestone, Pirelli e Continental; e fragrâncias exclusivas da Dior, Chanel, Versace e outras casas prestigiadas.",
      mission: "Nossa Missão",
      missionText:
        "Fornecer aos clientes acesso perfeito aos melhores produtos do mundo a preços competitivos, apoiados por serviço excepcional, orientação especializada e compromisso inabalável com a autenticidade. Nos esforçamos para tornar a qualidade premium acessível a todos, mantendo os mais altos padrões de satisfação do cliente.",
      values: "Nossos Valores",
      quality: "Qualidade em Primeiro Lugar",
      qualityText: "Fornecemos apenas produtos autênticos de distribuidores e fabricantes autorizados, garantindo que cada item atenda aos rigorosos padrões de qualidade.",
      innovation: "Inovação",
      innovationText: "Mantendo-nos à frente com a tecnologia e tendências de mercado mais recentes, expandimos continuamente nossas ofertas para servi-lo melhor.",
      trust: "Confiança & Transparência",
      trustText: "Construindo relacionamentos de longo prazo através de práticas comerciais honestas, comunicação clara e suporte pós-venda confiável.",
      growth: "Crescimento Contínuo",
      growthText: "Expandindo nossa gama de produtos, melhorando nossos serviços e adaptando-nos às necessidades em evolução dos clientes em um mercado em constante mudança.",
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
        {/* Who We Are */}
        <div className="glass-card p-8 rounded-2xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">{t.whoWeAre}</h2>
          <p className="text-lg text-gray-900 leading-relaxed mb-4">{t.intro}</p>
          <p className="text-lg text-gray-900 leading-relaxed">{t.intro2}</p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 rounded-2xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">{t.mission}</h2>
          <p className="text-lg text-gray-900 leading-relaxed">{t.missionText}</p>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.values}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t.quality}</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{t.qualityText}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t.innovation}</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{t.innovationText}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t.trust}</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{t.trustText}</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t.growth}</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{t.growthText}</p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">36+</div>
            <div className="text-gray-900 text-lg">{language === 'en' ? 'Premium Products' : 'Produtos Premium'}</div>
          </div>
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
            <div className="text-gray-900 text-lg">{language === 'en' ? 'Product Categories' : 'Categorias de Produtos'}</div>
          </div>
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-gray-900 text-lg">{language === 'en' ? 'Authentic Products' : 'Produtos Autênticos'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
