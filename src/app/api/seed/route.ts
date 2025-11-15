import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import crypto from 'crypto';

export async function POST(request: Request) {
  if (process.env.ALLOW_SEED !== 'true') {
    return NextResponse.json({ error: 'seeding disabled' }, { status: 403 });
  }
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ error: 'admin not configured' }, { status: 500 });
  const token = request.headers.get('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const products = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Molho de Tomate Artesanal', description: 'Feito com tomates frescos, sem conservantes. Perfeito para massas e carnes.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artisanal%20tomato%20sauce%20glass%20jar%2C%20fresh%20tomatoes%2C%20basil%20leaves%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square', images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artisanal%20tomato%20sauce%20glass%20jar%2C%20fresh%20tomatoes%2C%20basil%20leaves%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square'], category: 'Molhos', available: true, active: true },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Conserva de Pimenta', description: 'Pimentas selecionadas com especiarias. Ideal para acompanhar carnes.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chili%20pepper%20preserves%20glass%20jar%2C%20colorful%20peppers%2C%20rustic%20kitchen%20background%2C%20professional%20food%20photography&image_size=square', images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chili%20pepper%20preserves%20glass%20jar%2C%20colorful%20peppers%2C%20rustic%20kitchen%20background%2C%20professional%20food%20photography&image_size=square'], category: 'Conservas', available: true, active: true },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Tempero Completo', description: 'Mistura especial de ervas e especiarias. Realça o sabor de qualquer prato.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seasoning%20blend%20glass%20jar%2C%20mixed%20herbs%20and%20spices%2C%20wooden%20spoon%2C%20rustic%20background%2C%20professional%20food%20photography&image_size=square', images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seasoning%20blend%20glass%20jar%2C%20mixed%20herbs%20and%20spices%2C%20wooden%20spoon%2C%20rustic%20background%2C%20professional%20food%20photography&image_size=square'], category: 'Temperos', available: true, active: true },
    { id: '44444444-4444-4444-4444-444444444444', name: 'Azeite Extra Virgem', description: 'Primeira prensagem a frio, sabor intenso. Perfeito para saladas.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=extra%20virgin%20olive%20oil%20glass%20bottle%2C%20green%20olives%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20golden%20lighting&image_size=square', images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=extra%20virgin%20olive%20oil%20glass%20bottle%2C%20green%20olives%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20golden%20lighting&image_size=square'], category: 'Azeites', available: true, active: true },
    { id: '55555555-5555-5555-5555-555555555555', name: 'Molho de Alho', description: 'Preparado com alhos frescos. Excelente para churrascos e grelhados.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20sauce%20glass%20jar%2C%20fresh%20garlic%2C%20herbs%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square', images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20sauce%20glass%20jar%2C%20fresh%20garlic%2C%20herbs%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square'], category: 'Molhos', available: true, active: true },
    { id: '66666666-6666-6666-6666-666666666666', name: 'Vinagre Balsâmico', description: 'Envelhecido em barris de carvalho. Ideal para saladas e reduções.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=balsamic%20vinegar%20glass%20bottle%2C%20grapes%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20elegant%20lighting&image_size=square', images: ['https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=balsamic%20vinegar%20glass%20bottle%2C%20grapes%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20elegant%20lighting&image_size=square'], category: 'Vinagres', available: true, active: true }
  ];
  

  // Admin account seed
  const username = process.env.ADMIN_DEFAULT_USERNAME || 'Admsolnascente';
  const password = process.env.ADMIN_DEFAULT_PASSWORD || '';
  const salt = process.env.ADMIN_PASSWORD_SALT || 'local-dev-salt';
  const passwordHash = crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');

  const adminAccRes = await admin.from('admin_accounts')
    .upsert({ username, password_hash: passwordHash, active: true }, { onConflict: 'username' });
  if (adminAccRes.error) return NextResponse.json({ error: adminAccRes.error.message }, { status: 500 });

  const prodRes = await admin.from('products')
    .upsert(products, { onConflict: 'id', ignoreDuplicates: true });
  if (prodRes.error) return NextResponse.json({ error: prodRes.error.message }, { status: 500 });

  return NextResponse.json({ ok: true, products: prodRes.count ?? null, admin: username });
}