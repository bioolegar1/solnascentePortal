import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const client = getSupabaseClient();
  if (!client) return NextResponse.json({ data: id ? null : [], source: 'mock' });
  if (id) {
    const { data, error } = await client
      .from('jobs')
      .select('id,title,department,description,requirements,type,location,salary,active,createdAt')
      .eq('id', id)
      .single();
    if (error) return NextResponse.json({ data: null, error: error.message }, { status: 500 });
    return NextResponse.json({ data, source: 'supabase' });
  }
  const { data, error } = await client
    .from('jobs')
    .select('id,title,department,description,requirements,type,location,salary,active,createdAt')
    .eq('active', true)
    .order('createdAt', { ascending: false });
  if (error) return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  return NextResponse.json({ data, source: 'supabase' });
}