import { redirect } from 'next/navigation';
import clientPromise from '@/lib/db';

export default async function AliasRedirect({ params }: { params: { alias: string } }) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const entry = await collection.findOne({ alias: params.alias });
  if (entry) {
    redirect(entry.url);
  } else {
    return <p className="p-6 text-red-600">Alias not found.</p>;
  }
}
