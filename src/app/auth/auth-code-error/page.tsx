'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Home, RotateCcw } from 'lucide-react';

export default function AuthErrorPage() {
  const router = useRouter();
  const [errorDetails, setErrorDetails] = useState<string>('');

  useEffect(() => {
    // Get error details from URL if available
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    
    if (error) {
      // Use a microtask to avoid synchronous setState in effect
      Promise.resolve().then(() => {
        setErrorDetails(`${error}: ${errorDescription || 'Erro desconhecido'}`);
      });
    }
  }, []);

  const handleRetry = () => {
    router.push('/admin/login');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Erro de Autenticação</h1>
          <p className="text-red-100">Não foi possível concluir o login</p>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Oops! Algo deu errado</h2>
            <p className="text-gray-600 mb-4">
              Houve um problema ao tentar fazer login com sua conta Google. Isso pode acontecer por vários motivos:
            </p>
            
            <ul className="text-sm text-gray-600 text-left space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Você cancelou o processo de autenticação</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Sua conta Google não tem as permissões necessárias</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Houve um problema técnico temporário</span>
              </li>
            </ul>

            {errorDetails && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-xs font-mono">{errorDetails}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar Novamente
            </button>
            
            <button 
              onClick={handleGoHome}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              Voltar para Home
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Se o problema persistir, entre em contato com o suporte técnico.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-red-100 text-sm">
            © 2024 Sol Nascente. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}