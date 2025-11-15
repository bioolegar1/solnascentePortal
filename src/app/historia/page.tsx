import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Award, Leaf } from 'lucide-react';

const timelineEvents = [
  {
    year: '1947',
    title: 'Início da Jornada',
    description: 'Fundação da Sol Nascente com o objetivo de trazer alimentos de qualidade para as mesas brasileiras.',
    icon: Calendar,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%201940s%20kitchen%2C%20traditional%20brazilian%20family%20cooking%2C%20warm%20lighting%2C%20nostalgic%20atmosphere%2C%20professional%20photography&image_size=landscape_4_3'
  },
  {
    year: '1965',
    title: 'Primeira Expansão',
    description: 'Ampliação da linha de produtos e introdução de conservas artesanais, mantendo a tradição familiar.',
    icon: Users,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=1960s%20food%20production%20facility%2C%20traditional%20preservation%20methods%2C%20workers%20in%20white%20uniforms%2C%20professional%20photography&image_size=landscape_4_3'
  },
  {
    year: '1985',
    title: 'Inovação e Qualidade',
    description: 'Implementação de processos modernos sem perder a essência artesanal que caracteriza nossos produtos.',
    icon: Award,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=1980s%20food%20laboratory%2C%20quality%20testing%20equipment%2C%20scientists%20in%20lab%20coats%2C%20professional%20photography&image_size=landscape_4_3'
  },
  {
    year: '2005',
    title: 'Compromisso Ambiental',
    description: 'Lançamento de iniciativas sustentáveis e parcerias com produtores locais comprometidos com o meio ambiente.',
    icon: Leaf,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=sustainable%20agriculture%20farm%2C%20organic%20vegetables%2C%20farmers%20working%2C%20green%20environment%2C%20professional%20photography&image_size=landscape_4_3'
  },
  {
    year: '2024',
    title: 'Transformação Digital',
    description: 'Lançamento do portal digital para estar mais próximo de nossos clientes e compartilhar nossa história com o mundo.',
    icon: Award,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20food%20company%20headquarters%2C%20digital%20displays%2C%20contemporary%20architecture%2C%20professional%20photography&image_size=landscape_4_3'
  }
];

const values = [
  {
    title: 'Tradição',
    description: 'Mantemos viva a essência da culinária brasileira, respeitando receitas transmitidas por gerações.',
    icon: '🏠'
  },
  {
    title: 'Qualidade',
    description: 'Selecionamos os melhores ingredientes e mantemos rigorosos padrões de qualidade em todos os processos.',
    icon: '⭐'
  },
  {
    title: 'Autenticidade',
    description: 'Cada produto carrega o sabor genuíno da comida de verdade, feita com amor e dedicação.',
    icon: '❤️'
  },
  {
    title: 'Sustentabilidade',
    description: 'Compromisso com o futuro, adotando práticas que respeitam o meio ambiente e as comunidades locais.',
    icon: '🌱'
  }
];

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SN</span>
              </div>
              <span className="text-2xl font-bold text-green-800">Sol Nascente</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">Início</Link>
              <Link href="/produtos" className="text-gray-700 hover:text-green-600 font-medium">Produtos</Link>
              <Link href="/historia" className="text-green-600 font-medium">Nossa História</Link>
              <Link href="/sustentabilidade" className="text-gray-700 hover:text-green-600 font-medium">Sustentabilidade</Link>
              <Link href="/carreiras" className="text-gray-700 hover:text-green-600 font-medium">Carreiras</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Nossa História
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Desde 1947, preservando a tradição da culinária autêntica brasileira
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossa Jornada
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça os marcos importantes que marcaram nossa trajetória ao longo de mais de 75 anos.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
            
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-5/12 ${
                    index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                  }`}>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-2xl font-bold text-green-800 mb-2">
                        {event.year}
                      </h3>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`w-5/12 ${
                    index % 2 === 0 ? 'pl-8' : 'pr-8'
                  }`}>
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Inspirados no manifesto Cepera, valorizamos a cozinha simples, democrática e autêntica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Conheça nossos produtos e experimente a tradição que há mais de 75 anos 
            leva sabor autêntico às mesas brasileiras.
          </p>
          <Link
            href="/produtos"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Explorar Produtos
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SN</span>
                </div>
                <span className="text-2xl font-bold">Sol Nascente</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Valorizamos a cozinha simples, democrática e autêntica. Desde 1947, 
                trazendo sabores autênticos para sua casa com frescor e qualidade.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
                <li><Link href="/produtos" className="text-gray-300 hover:text-white transition-colors">Produtos</Link></li>
                <li><Link href="/historia" className="text-gray-300 hover:text-white transition-colors">Nossa História</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="text-gray-300">(11) 9999-9999</div>
                <div className="text-gray-300">contato@solnascente.com.br</div>
                <div className="text-gray-300">São Paulo, SP</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 Sol Nascente. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}