import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.error('Supabase client not configured');
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  try {
    // Exchange code for session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error('Code exchange error:', exchangeError);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // Handle successful authentication
    if (data?.session?.user) {
      // Ensure user profile exists
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.session.user.id,
          role: 'user', // Default role, can be changed to admin later
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      // Redirect to intended page
      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  } catch (err) {
    console.error('Unexpected auth error:', err);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    const { action } = await request.json();

    switch (action) {
      case 'signout':
        const { error: signoutError } = await supabase.auth.signOut();
        if (signoutError) {
          return NextResponse.json({ error: signoutError.message }, { status: 400 });
        }
        return NextResponse.json({ success: true });

      case 'get-session':
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          return NextResponse.json({ error: sessionError.message }, { status: 400 });
        }
        return NextResponse.json({ session });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (err) {
    console.error('Auth API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}