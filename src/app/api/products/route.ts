import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';

export async function GET() {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json({ data: [], source: 'mock' });
  const { data, error } = await client
    .from('products')
    .select('id,name,description,image,category,price,available')
    .eq('active', true);
  if (error) return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  return NextResponse.json({ data, source: 'supabase' });
}