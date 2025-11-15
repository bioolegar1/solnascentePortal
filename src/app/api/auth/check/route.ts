import { getSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = getSupabaseServerClient();
  
  if (!supabase) {
    return NextResponse.json({
      error: 'Supabase not configured',
      status: 'error'
    }, { status: 500 });
  }

  try {
    // Check if Google OAuth is enabled by trying to get the auth config
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json({
        error: error.message,
        status: 'error'
      }, { status: 400 });
    }

    // Check environment variables
    const config = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configured' : '❌ Missing',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing',
      googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ Configured' : '❌ Missing',
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? '✅ Configured' : '❌ Missing',
      currentUser: data?.session?.user?.email || 'Not authenticated',
      status: 'success'
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      error: 'Failed to check authentication status',
      status: 'error'
    }, { status: 500 });
  }
}