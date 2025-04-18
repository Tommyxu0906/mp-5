'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortened, setShortened] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ url, alias }),
    });
    const data = await res.json();
    if (res.ok) {
      setShortened(`${window.location.origin}/${alias}`);
      setError('');
    } else {
      setError(data.error);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1>CS391 mp-5</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter full URL" />
        <input className="border p-2 w-full" value={alias} onChange={e => setAlias(e.target.value)} placeholder="Enter custom alias" />
        <button className="bg-blue-600 text-white px-4 py-2" type="submit">Shorten</button>
      </form>
      {shortened && <p className="mt-4">Shortened URL: <a href={shortened} className="text-blue-500 underline">{shortened}</a></p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  );
}

