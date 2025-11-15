'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const client = getSupabaseClient();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async () => {
    if (!client) {
      setError('Autenticação indisponível');
      return;
    }
    setIsLoading(true);
    setError('');
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const { error: err } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin}/admin/dashboard` }
    });
    if (err) {
      setError('Falha no login Google');
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) {
      setError('Autenticação indisponível');
      return;
    }
    setIsLoading(true);
    setError('');
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const { error: err } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/admin/dashboard` } });
    if (err) setError('Falha ao enviar link');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 font-bold text-xl">SN</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sol Nascente</h1>
          <p className="text-green-100">Acesso Administrativo</p>
        </div>
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-600">Entre com sua conta</p>
          </div>
          <div className="space-y-4">
            <button onClick={handleGoogle} disabled={isLoading} className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${isLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>Entrar com Google</button>
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="admin@solnascente.com" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${isLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>Receber link por email</button>
            </form>
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-red-600 text-sm">{error}</p></div>}
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-green-100 text-sm">© 2024 Sol Nascente. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}