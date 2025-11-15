import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Recycle, Droplets, Sun, TreePine, Award } from 'lucide-react';

const initiatives = [
  {
    title: 'Energia Renovável',
    description: 'Utilizamos energia solar em 80% de nossas operações, reduzindo significativamente nossa pegada de carbono.',
    icon: Sun,
    impact: 'Redução de 40% nas emissões de CO2'
  },
  {
    title: 'Gestão da Água',
    description: 'Sistema de reuso de água que permite a reutilização de 70% da água em nossos processos produtivos.',
    icon: Droplets,
    impact: 'Economia de 2 milhões de litros por ano'
  },
  {
    title: 'Embalagens Sustentáveis',
    description: 'Utilizamos embalagens recicláveis e biodegradáveis em 90% de nossa linha de produtos.',
    icon: Recycle,
    impact: 'Redução de 500 toneladas de plástico'
  },
  {
    title: 'Agricultura Responsável',
    description: 'Parcerias com produtores locais que adotam práticas agrícolas sustentáveis e orgânicas.',
    icon: TreePine,
    impact: 'Apoio a 200 pequenos produtores'
  }
];

const certifications = [
  {
    title: 'ISO 14001',
    description: 'Certificação em Sistema de Gestão Ambiental',
    year: '2018'
  },
  {
    title: 'Selo Verde',
    description: 'Reconhecimento por práticas sustentáveis',
    year: '2020'
  },
  {
    title: 'Organic Brazil',
    description: 'Certificação de produtos orgânicos',
    year: '2021'
  },
  {
    title: 'Carbono Neutro',
    description: 'Compensação 100% das emissões de carbono',
    year: '2023'
  }
];

export default function SustentabilidadePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <Leaf className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Sustentabilidade
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Compromisso com o futuro do nosso planeta e das próximas gerações
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossa Missão Verde
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acreditamos que é possível conciliar qualidade alimentar com responsabilidade ambiental. 
              Cada decisão que tomamos considera o impacto no meio ambiente e nas comunidades onde atuamos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sustainable%20food%20production%20facility%2C%20solar%20panels%2C%20green%20vegetation%2C%20modern%20architecture%2C%20professional%20photography&image_size=landscape_4_3"
                alt="Instalações sustentáveis"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Compromisso Ambiental
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Desde 2015, investimos pesado em tecnologias limpas e processos sustentáveis. 
                  Nossa meta é alcançar neutralidade de carbono até 2030.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Responsabilidade Social
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Apoiamos mais de 200 pequenos produtores locais, promovendo práticas agrícolas 
                  sustentáveis e comércio justo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossas Iniciativas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ações concretas que fazemos para construir um futuro mais sustentável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => {
              const IconComponent = initiative.icon;
              return (
                <div key={index} className="bg-green-50 rounded-lg p-8 hover:bg-green-100 transition-colors duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {initiative.description}
                      </p>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm font-semibold text-green-700">
                          Impacto: {initiative.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certificações
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reconhecimentos que validam nosso compromisso com a sustentabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {cert.description}
                </p>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Junte-se a Nós na Construção de um Futuro Sustentável
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Conheça nossos produtos produzidos com responsabilidade ambiental e 
            faça parte da mudança que queremos ver no mundo.
          </p>
          <Link
            href="/produtos"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Explorar Produtos Sustentáveis
          </Link>
        </div>
      </section>
    </div>
  );
}