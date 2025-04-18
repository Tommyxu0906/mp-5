'use client';
import { useState } from 'react';
import createNewAlias from '@/lib/createNewAlias';

export default function Home() {
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await createNewAlias(
      (data.alias as string).trim(),
      (data.url as string).trim()
    );
    if (typeof res === 'string') {
      setError(res);
      setResult('');
    } else {
      setError('');
      setResult(`${location.origin}/${res.alias}`);
    }
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>

      <form
        onSubmit={onSubmit}
        className="max-w-md mx-auto flex flex-col space-y-4"
      >
        <label className="flex flex-col text-sm">
          Long URL
          <input
            name="url"
            type="url"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </label>

        <label className="flex flex-col text-sm">
          Alias
          <input
            name="alias"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Shorten
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {result && (
        <div className="max-w-md mx-auto mt-4 flex items-center justify-between">
          <a
            href={result}
            className="text-blue-600 break-all"
          >
            {result}
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="ml-2 px-3 py-1 border border-blue-500 text-blue-500 rounded"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
