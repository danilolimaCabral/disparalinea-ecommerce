import { Building2, Users, Award, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Sobre a DisparaLinea Trading
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Somos uma empresa líder em comércio eletrônico, oferecendo produtos de alta qualidade 
            nas categorias de tecnologia, automotivo e fragrâncias premium desde 2020.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Excelência</h3>
              <p className="text-sm text-muted-foreground">
                Compromisso com a qualidade em cada produto e serviço
              </p>
            </div>

            <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Foco no Cliente</h3>
              <p className="text-sm text-muted-foreground">
                Sua satisfação é nossa prioridade máxima
              </p>
            </div>

            <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Inovação</h3>
              <p className="text-sm text-muted-foreground">
                Sempre buscando as melhores soluções do mercado
              </p>
            </div>

            <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Confiança</h3>
              <p className="text-sm text-muted-foreground">
                Transações seguras e garantia de qualidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Proporcionar aos nossos clientes acesso aos melhores produtos do mercado, 
                com preços competitivos, entrega rápida e atendimento excepcional, 
                tornando a experiência de compra online simples e confiável.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser reconhecida como a plataforma de e-commerce mais confiável e inovadora, 
                expandindo continuamente nosso catálogo e alcançando clientes em todo o país 
                com excelência em cada interação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">36+</div>
              <div className="text-sm text-muted-foreground">Produtos Premium</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Produtos Originais</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte Online</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
