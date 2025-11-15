import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
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
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/produtos" className="text-gray-300 hover:text-white transition-colors">Produtos</Link></li>
              <li><Link href="/historia" className="text-gray-300 hover:text-white transition-colors">Nossa História</Link></li>
              <li><Link href="/sustentabilidade" className="text-gray-300 hover:text-white transition-colors">Sustentabilidade</Link></li>
              <li><Link href="/carreiras" className="text-gray-300 hover:text-white transition-colors">Carreiras</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <span className="text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span className="text-gray-300">contato@solnascente.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
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
  );
};

export default Footer;