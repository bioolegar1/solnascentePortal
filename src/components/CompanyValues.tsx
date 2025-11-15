import { Leaf, Heart, Award, Users } from 'lucide-react';

const CompanyValues = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      description: 'Compromisso com práticas sustentáveis e respeito ao meio ambiente em todas as etapas da produção.'
    },
    {
      icon: Heart,
      title: 'Autenticidade',
      description: 'Receitas originais da nossa cultura, preparadas com carinho e ingredientes selecionados.'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Padrões rigorosos de qualidade que garantem produtos frescos e saborosos.'
    },
    {
      icon: Users,
      title: 'Democracia',
      description: 'Culinária acessível para todos, mantendo a tradição e o sabor autêntico.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Valores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Inspirados no manifesto Cepera, valorizamos a cozinha simples, democrática e autêntica. 
            Aquela que é original da nossa cultura e de nossas casas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <a
            href="/historia"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            Conhecer Nossa História
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;