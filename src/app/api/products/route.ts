import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { getSupabaseServerClient, requireAdmin } from '@/lib/supabaseServer';

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

export async function POST(request: Request) {
  const server = getSupabaseServerClient();
  if (!server) return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
  const auth = await requireAdmin(server);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const body = await request.json();
  const { name, description, image, category, price, available } = body || {};
  const { data, error } = await server
    .from('products')
    .insert([{ name, description, image, category, price, available, active: true }])
    .select('id,name,description,image,category,price,available')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const server = getSupabaseServerClient();
  if (!server) return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
  const auth = await requireAdmin(server);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const body = await request.json();
  const { name, description, image, category, price, available, active } = body || {};
  const { data, error } = await server
    .from('products')
    .update({ name, description, image, category, price, available, active })
    .eq('id', id)
    .select('id,name,description,image,category,price,available')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const server = getSupabaseServerClient();
  if (!server) return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
  const auth = await requireAdmin(server);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const { error } = await server
    .from('products')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
