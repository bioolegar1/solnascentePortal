import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const admin = getSupabaseAdmin();
    if (!admin) return NextResponse.json({ error: 'admin not configured' }, { status: 500 });

    const bucket = 'products';
    // Ensure bucket exists and is public
    await admin.storage.createBucket(bucket, { public: true }).catch(() => {});

    const form = await request.formData();
    const files = form.getAll('files') as File[];
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'no files provided' }, { status: 400 });
    }
    if (files.length > 5) {
      return NextResponse.json({ error: 'max 5 files allowed' }, { status: 400 });
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    const urls: string[] = [];
    for (const file of files) {
      if (!allowed.includes(file.type)) {
        return NextResponse.json({ error: `invalid type ${file.type}` }, { status: 400 });
      }
      const ext = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp';
      const path = `products/${randomUUID()}.${ext}`;
      const { error } = await admin.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      const { data } = admin.storage.from(bucket).getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    return NextResponse.json({ urls });
  } catch {
    return NextResponse.json({ error: 'upload failed' }, { status: 500 });
  }
}