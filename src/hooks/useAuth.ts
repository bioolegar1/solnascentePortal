import { useEffect, useState } from 'react';
import { getSupabaseComponentClient } from '@/lib/supabase/component';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string | null;
  role?: 'user' | 'admin';
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseComponentClient();
    if (!supabase) {
      setError('Supabase client not configured');
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const sessionRes = await fetch('/api/admin/session');
        const sessionJson = await sessionRes.json().catch(() => ({ isAuthenticated: false }));
        if (sessionJson.isAuthenticated && sessionJson.isAdmin) {
          setUser({ id: 'admin', email: `${sessionJson.username || 'admin'}@local`, role: 'admin' });
          setLoading(false);
          return;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          if (profileError) {
            console.error('Error fetching user profile:', profileError);
          }
          setUser({ id: session.user.id, email: session.user.email ?? null, role: profile?.role || 'user' });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        }
        setUser({ id: session.user.id, email: session.user.email ?? null, role: profile?.role || 'user' });
      } else {
        try {
          const sessionRes = await fetch('/api/admin/session');
          const sessionJson = await sessionRes.json().catch(() => ({ isAuthenticated: false }));
          if (sessionJson.isAuthenticated && sessionJson.isAdmin) {
            setUser({ id: 'admin', email: `${sessionJson.username || 'admin'}@local`, role: 'admin' });
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      try {
        await fetch('/api/admin/logout', { method: 'POST' });
      } catch {}
      const supabase = getSupabaseComponentClient();
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          setError(error.message);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
    }
  };

  const isAdmin = user?.role === 'admin';

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin,
    signOut
  };
}