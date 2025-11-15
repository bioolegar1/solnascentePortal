import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';

export async function GET() {
  const client = getSupabaseClient();
  const configured = !!client;
  return NextResponse.json({ supabaseConfigured: configured });
}