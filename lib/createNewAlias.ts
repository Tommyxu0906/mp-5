'use server';

import getCollection, { ALIAS_COLLECTION } from '@/db';
import { AliasProps } from '@/types';

export default async function createNewAlias(
  alias: string,
  url: string
): Promise<AliasProps | string> {
  const collection = await getCollection(ALIAS_COLLECTION);
  if (await collection.findOne({ alias })) {
    return 'Invalid alias: This alias already exists';
  }
  if (!alias || encodeURIComponent(alias) !== alias) {
    return 'Invalid alias: You may only use valid URL characters';
  }
  try {
    const ok = url && (await fetch(url, { method: 'HEAD' })).ok;
    if (!ok) {
      return 'Invalid URL: Could not verify URL. Please try again.';
    }
  } catch {
    return 'Invalid URL: Could not verify URL. Please try again.';
  }

  const newAlias = { alias, url };
  const { insertedId } = await collection.insertOne(newAlias);
  return { ...newAlias, id: insertedId.toHexString() };
}
