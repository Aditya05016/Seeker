"use client"; // This tells Next.js this is an interactive component

import React, { useState } from 'react';

interface UrlInputProps {
  onFetch: (url: string) => void;
}

export default function UrlInput({ onFetch }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onFetch(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl flex gap-2">
      <input
        type="text"
        placeholder="Paste YouTube Video URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Get Transcript
      </button>
    </form>
  );
}