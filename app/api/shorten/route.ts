import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function POST(req: NextRequest) {
  const { url, alias } = await req.json();

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const existing = await collection.findOne({ alias });
  if (existing) {
    return NextResponse.json({ error: 'Alias already taken' }, { status: 400 });
  }

  await collection.insertOne({ alias, url });
  return NextResponse.json({ message: 'Success' });
}
