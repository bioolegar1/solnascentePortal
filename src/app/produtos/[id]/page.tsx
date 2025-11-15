import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package, Award, Leaf } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  image?: string;
  images?: string[];
  category: string;
  available: boolean;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Molho de Tomate Artesanal',
    description: 'Feito com tomates frescos, sem conservantes. Perfeito para massas e carnes.',
    fullDescription: 'Nosso molho de tomate artesanal é preparado com tomates frescos, colhidos no ponto certo de maturação. Sem conservantes artificiais, mantém o sabor autêntico e natural do tomate. Perfeito para acompanhar massas, carnes e preparações diversas.',
    images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artisanal%20tomato%20sauce%20glass%20jar%2C%20fresh%20tomatoes%2C%20basil%20leaves%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20high%20resolution&image_size=square_hd'],
    category: 'Molhos',
    // sem preço
    available: true,
    ingredients: ['Tomate fresco', 'Alho', 'Cebola', 'Azeite de oliva', 'Sal', 'Manjericão', 'Orégano'],
    nutritionalInfo: {
      calories: 45,
      protein: 2,
      carbs: 8,
      fat: 1
    }
  },
  '2': {
    id: '2',
    name: 'Conserva de Pimenta',
    description: 'Pimentas selecionadas com especiarias. Ideal para acompanhar carnes.',
    fullDescription: 'Conserva artesanal de pimenta, preparada com pimentas selecionadas e uma combinação especial de especiarias. Adicione um toque picante e saboroso aos seus pratos favoritos.',
    images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chili%20pepper%20preserves%20glass%20jar%2C%20colorful%20peppers%2C%20rustic%20kitchen%20background%2C%20professional%20food%20photography%2C%20high%20resolution&image_size=square_hd'],
    category: 'Conservas',
    // sem preço
    available: true,
    ingredients: ['Pimentas variadas', 'Vinagre de vinho', 'Sal', 'Açúcar', 'Especiarias'],
    nutritionalInfo: {
      calories: 15,
      protein: 0,
      carbs: 3,
      fat: 0
    }
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProdutoDetalhesPage({ params }: PageProps) {
  const { id } = await params;
  const product = mockProducts[id];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-green-600">Início</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-green-600">Produtos</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/produtos"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={product.images?.[0] || product.image || ''}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Product Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4 mr-1" />
                Natural
              </div>
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                <Award className="w-4 h-4 mr-1" />
                Premium
              </div>
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <Package className="w-4 h-4 mr-1" />
                Artesanal
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                {/* Catálogo sem preço */}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.available ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Disponível
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Indisponível
                  </span>
                )}
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Descrição Completa
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ingredientes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Informação Nutricional (por 100g)
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {product.nutritionalInfo.calories}
                    </div>
                    <div className="text-sm text-gray-600">Calorias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {product.nutritionalInfo.protein}g
                    </div>
                    <div className="text-sm text-gray-600">Proteínas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {product.nutritionalInfo.carbs}g
                    </div>
                    <div className="text-sm text-gray-600">Carboidratos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {product.nutritionalInfo.fat}g
                    </div>
                    <div className="text-sm text-gray-600">Gorduras</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={!product.available}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  product.available
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.available ? 'Solicitar Orçamento' : 'Indisponível'}
              </button>
              <Link
                href="/produtos"
                className="flex-1 py-3 px-6 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 text-center"
              >
                Ver Mais Produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}