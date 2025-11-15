'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json?.error || 'Falha no login');
        setIsLoading(false);
        return;
      }
      router.push('/admin/dashboard');
    } catch {
      setError('Erro inesperado. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-green-600 font-bold text-xl">SN</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sol Nascente</h1>
          <p className="text-green-100 text-lg">Acesso Administrativo</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-600">Acesse o painel administrativo com usuário e senha</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                <>
                  <LockKeyhole className="w-5 h-5" />
                  <span>Entrar</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-700 text-xs text-center">
                🔒 Seu login é seguro e protegido por autenticação de dois fatores
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-green-100 text-sm">
            © 2024 Sol Nascente. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}