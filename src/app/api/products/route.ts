import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { getSupabaseServerClient, requireAdmin } from '@/lib/supabase/server';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  category: string;
  available: boolean;
  active: boolean;
  price?: number;
  created_at?: string;
}

export async function GET() {
  try {
    const client = getSupabaseClient();
    if (!client) {
      return NextResponse.json({ data: [], source: 'mock' });
    }

    // Query products with images array support
    const { data, error } = await client
      .from('products')
      .select('id,name,description,image,images,category,available,active,created_at')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Products query error:', error);
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    // Ensure images field is properly handled
    const products = (data || []).map((product: Product) => ({
      ...product,
      images: product.images || (product.image ? [product.image] : [])
    }));

    return NextResponse.json({ data: products, source: 'supabase' });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ data: [], error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const server = getSupabaseServerClient();
    if (!server) {
      return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
    }

    const auth = await requireAdmin(server);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.message }, { status: auth.status });
    }

    const body = await request.json();
    const { name, description, image, images, category, available } = body || {};

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nome do produto é obrigatório' }, { status: 400 });
    }

    if (!category?.trim()) {
      return NextResponse.json({ error: 'Categoria é obrigatória' }, { status: 400 });
    }

    // Process images
    const imgs = Array.isArray(images) 
      ? images.filter((s: string) => !!s?.trim()).slice(0, 5) 
      : (image?.trim() ? [image.trim()] : []);

    if (imgs.length < 1) {
      return NextResponse.json({ error: 'Informe ao menos 1 imagem' }, { status: 400 });
    }

    const productData = {
      name: name.trim(),
      description: description?.trim() || '',
      image: imgs[0], // Primary image
      images: imgs,  // Array of all images
      category: category.trim(),
      available: Boolean(available),
      active: true,
      price: 0 // Default price for catalog mode
    };

    const { data, error } = await server
      .from('products')
      .insert([productData])
      .select('id,name,description,image,images,category,available,active,created_at')
      .single();

    if (error) {
      console.error('Product insertion error:', error);
      return NextResponse.json({ error: error.message || 'Erro ao inserir produto' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Erro ao processar requisição' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const server = getSupabaseServerClient();
    if (!server) {
      return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
    }

    const auth = await requireAdmin(server);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.message }, { status: auth.status });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID do produto é obrigatório' }, { status: 400 });
    }

    const body = await request.json();
    const { name, description, image, images, category, available, active } = body || {};

    // Validate required fields
    if (name !== undefined && !name?.trim()) {
      return NextResponse.json({ error: 'Nome do produto é obrigatório' }, { status: 400 });
    }

    if (category !== undefined && !category?.trim()) {
      return NextResponse.json({ error: 'Categoria é obrigatória' }, { status: 400 });
    }

    // Process images if provided
    const updateData: Partial<Product> = {
      name: name?.trim(),
      description: description?.trim(),
      category: category?.trim(),
      available: available === undefined ? undefined : Boolean(available),
      active: active === undefined ? undefined : Boolean(active)
    };

    if (image !== undefined || images !== undefined) {
      const imgs = Array.isArray(images) 
        ? images.filter((s: string) => !!s?.trim()).slice(0, 5) 
        : (image?.trim() ? [image.trim()] : []);

      if (imgs.length < 1) {
        return NextResponse.json({ error: 'Informe ao menos 1 imagem' }, { status: 400 });
      }

      updateData.image = imgs[0];
      updateData.images = imgs;
    }

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof Partial<Product>] === undefined) {
        delete updateData[key as keyof Partial<Product>];
      }
    });

    const { data, error } = await server
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select('id,name,description,image,images,category,available,active,created_at')
      .single();

    if (error) {
      console.error('Product update error:', error);
      return NextResponse.json({ error: error.message || 'Erro ao atualizar produto' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('PUT /api/products error:', error);
    return NextResponse.json({ error: 'Erro ao processar requisição' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const server = getSupabaseServerClient();
    if (!server) {
      return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 });
    }

    const auth = await requireAdmin(server);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.message }, { status: auth.status });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID do produto é obrigatório' }, { status: 400 });
    }

    const { error } = await server
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Product deletion error:', error);
      return NextResponse.json({ error: error.message || 'Erro ao deletar produto' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/products error:', error);
    return NextResponse.json({ error: 'Erro ao processar requisição' }, { status: 500 });
  }
}