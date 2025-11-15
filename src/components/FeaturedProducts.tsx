import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Molho de Tomate Artesanal',
    description: 'Feito com tomates frescos, sem conservantes',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artisanal%20tomato%20sauce%20in%20glass%20jar%2C%20rustic%20wooden%20background%2C%20fresh%20tomatoes%20around%2C%20professional%20food%20photography%2C%20warm%20lighting&image_size=square',
    category: 'Molhos'
  },
  {
    id: '2',
    name: 'Conserva de Pimenta',
    description: 'Pimentas selecionadas com especiarias',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chili%20pepper%20preserves%20in%20glass%20jar%2C%20colorful%20peppers%2C%20rustic%20kitchen%20background%2C%20professional%20food%20photography&image_size=square',
    category: 'Conservas'
  },
  {
    id: '3',
    name: 'Tempero Completo',
    description: 'Mistura especial de ervas e especiarias',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seasoning%20blend%20in%20glass%20jar%2C%20mixed%20herbs%20and%20spices%2C%20wooden%20spoon%2C%20rustic%20background%2C%20professional%20food%20photography&image_size=square',
    category: 'Temperos'
  },
  {
    id: '4',
    name: 'Azeite Extra Virgem',
    description: 'Primeira prensagem a frio, sabor intenso',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=extra%20virgin%20olive%20oil%20in%20glass%20bottle%2C%20green%20olives%20around%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20golden%20lighting&image_size=square',
    category: 'Azeites'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada produto é cuidadosamente elaborado com ingredientes selecionados, 
            mantendo a tradição e qualidade que nossos clientes merecem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <Link
                  href={`/produtos/${product.id}`}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/produtos"
            className="inline-block bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;