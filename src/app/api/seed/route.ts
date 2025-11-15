import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

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
    { id: '1', name: 'Molho de Tomate Artesanal', description: 'Feito com tomates frescos, sem conservantes. Perfeito para massas e carnes.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=artisanal%20tomato%20sauce%20glass%20jar%2C%20fresh%20tomatoes%2C%20basil%20leaves%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square', category: 'Molhos', price: 24.90, available: true, active: true },
    { id: '2', name: 'Conserva de Pimenta', description: 'Pimentas selecionadas com especiarias. Ideal para acompanhar carnes.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=chili%20pepper%20preserves%20glass%20jar%2C%20colorful%20peppers%2C%20rustic%20kitchen%20background%2C%20professional%20food%20photography&image_size=square', category: 'Conservas', price: 32.90, available: true, active: true },
    { id: '3', name: 'Tempero Completo', description: 'Mistura especial de ervas e especiarias. Realça o sabor de qualquer prato.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=seasoning%20blend%20glass%20jar%2C%20mixed%20herbs%20and%20spices%2C%20wooden%20spoon%2C%20rustic%20background%2C%20professional%20food%20photography&image_size=square', category: 'Temperos', price: 18.90, available: true, active: true },
    { id: '4', name: 'Azeite Extra Virgem', description: 'Primeira prensagem a frio, sabor intenso. Perfeito para saladas.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=extra%20virgin%20olive%20oil%20glass%20bottle%2C%20green%20olives%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20golden%20lighting&image_size=square', category: 'Azeites', price: 45.90, available: true, active: true },
    { id: '5', name: 'Molho de Alho', description: 'Preparado com alhos frescos. Excelente para churrascos e grelhados.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=garlic%20sauce%20glass%20jar%2C%20fresh%20garlic%2C%20herbs%2C%20wooden%20background%2C%20professional%20food%20photography&image_size=square', category: 'Molhos', price: 28.90, available: true, active: true },
    { id: '6', name: 'Vinagre Balsâmico', description: 'Envelhecido em barris de carvalho. Ideal para saladas e reduções.', image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=balsamic%20vinegar%20glass%20bottle%2C%20grapes%2C%20wooden%20background%2C%20professional%20food%20photography%2C%20elegant%20lighting&image_size=square', category: 'Vinagres', price: 38.90, available: true, active: true }
  ];
  const jobs = [
    { id: '1', title: 'Desenvolvedor Frontend', department: 'Tecnologia', description: 'Desenvolver e manter interfaces web modernas e responsivas para nosso portal digital.', requirements: ['React','TypeScript','Tailwind CSS','Next.js','Git'], type: 'CLT', location: 'São Paulo - SP', salary: 'R$ 8.000 - R$ 12.000', active: true },
    { id: '2', title: 'Analista de Qualidade', department: 'Qualidade', description: 'Garantir a qualidade dos produtos através de análises e controles rigorosos.', requirements: ['Análise sensorial','Controle de qualidade','ISO 9001','Laboratório'], type: 'CLT', location: 'São Paulo - SP', salary: 'R$ 5.000 - R$ 7.000', active: true },
    { id: '3', title: 'Coordenador de Produção', department: 'Produção', description: 'Coordenar equipes de produção e garantir eficiência nos processos.', requirements: ['Gestão de equipes','Lean Manufacturing','Segurança no trabalho','Excel'], type: 'CLT', location: 'Campinas - SP', salary: 'R$ 10.000 - R$ 15.000', active: true },
    { id: '4', title: 'Especialista em Marketing Digital', department: 'Marketing', description: 'Desenvolver estratégias digitais para fortalecer nossa presença online.', requirements: ['Marketing Digital','SEO/SEM','Google Analytics','Social Media'], type: 'PJ', location: 'Remoto', salary: 'R$ 6.000 - R$ 9.000', active: true }
  ];

  const prodRes = await admin.from('products')
    .upsert(products, { onConflict: 'id', ignoreDuplicates: true });
  if (prodRes.error) return NextResponse.json({ error: prodRes.error.message }, { status: 500 });

  const jobsRes = await admin.from('jobs')
    .upsert(jobs, { onConflict: 'id', ignoreDuplicates: true });
  if (jobsRes.error) return NextResponse.json({ error: jobsRes.error.message }, { status: 500 });

  return NextResponse.json({ ok: true, products: prodRes.count ?? null, jobs: jobsRes.count ?? null });
}