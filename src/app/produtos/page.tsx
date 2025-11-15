'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  images?: string[];
  category: string;
  // Sem preço no catálogo
  available: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Molho de Tomate Artesanal',
    description: 'Feito com tomates frescos, sem conservantes. Perfeito para massas e carnes.',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artisanal%20tomato%20sauce%20glass%20jar%2C%20fresh%20tomatoes%2C%20basil%20leaves%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square',
    category: 'Molhos',
    available: true
  },
  {
    id: '2',
    name: 'Conserva de Pimenta',
    description: 'Pimentas selecionadas com especiarias. Ideal para acompanhar carnes.',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chili%20pepper%20preserves%20glass%20jar%2C%20colorful%20peppers%2C%20rustic%20kitchen%20background%2C%20professional%20food%20photography&image_size=square',
    category: 'Conservas',
    available: true
  },
  {
    id: '3',
    name: 'Tempero Completo',
    description: 'Mistura especial de ervas e especiarias. Realça o sabor de qualquer prato.',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seasoning%20blend%20glass%20jar%2C%20mixed%20herbs%20and%20spices%2C%20wooden%20spoon%2C%20rustic%20background%2C%20professional%20food%20photography&image_size=square',
    category: 'Temperos',
    available: true
  },
  {
    id: '4',
    name: 'Azeite Extra Virgem',
    description: 'Primeira prensagem a frio, sabor intenso. Perfeito para saladas.',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=extra%20virgin%20olive%20oil%20glass%20bottle%2C%20green%20olives%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20golden%20lighting&image_size=square',
    category: 'Azeites',
    available: true
  },
  {
    id: '5',
    name: 'Molho de Alho',
    description: 'Preparado com alhos frescos. Excelente para churrascos e grelhados.',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20sauce%20glass%20jar%2C%20fresh%20garlic%2C%20herbs%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square',
    category: 'Molhos',
    available: true
  },
  {
    id: '6',
    name: 'Vinagre Balsâmico',
    description: 'Envelhecido em barris de carvalho. Ideal para saladas e reduções.',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=balsamic%20vinegar%20glass%20bottle%2C%20grapes%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20elegant%20lighting&image_size=square',
    category: 'Vinagres',
    available: true
  }
];

const categories = ['Todos', 'Molhos', 'Conservas', 'Temperos', 'Azeites', 'Vinagres'];

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  useEffect(() => {
    let mounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (mounted && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Use useMemo to filter products efficiently
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/produtos" className="text-green-600 font-medium">Produtos</Link>
              <Link href="/historia" className="text-gray-700 hover:text-green-600 font-medium">Nossa História</Link>
              <Link href="/sustentabilidade" className="text-gray-700 hover:text-green-600 font-medium">Sustentabilidade</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nossos Produtos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossa linha completa de produtos cuidadosamente elaborados 
              com ingredientes selecionados e tradição autêntica.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? 'Carregando...' : `${filteredProducts.length} produto(s) encontrado(s)`}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar sua busca ou filtro para encontrar mais produtos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                <Image
                  src={product.images?.[0] || product.image || ''}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                  {!product.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Indisponível
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  {/* Catálogo sem preço */}
                  <Link
                    href={`/produtos/${product.id}`}
                    className={`inline-block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      product.available
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.available ? 'Ver Detalhes' : 'Indisponível'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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