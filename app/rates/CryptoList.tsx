// app/rates/CryptoList.tsx (Client Component)
"use client";

import Link from 'next/link';

export default function CryptoList({ assets }: { assets: any[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <Link
          key={asset.id}
          href={`/rates/${asset.id}`}
          className="p-4 border rounded-lg hover:shadow-lg transition"
        >
          <div>
            <h2 className="text-lg font-bold">{asset.name}</h2>
            <p>Rank: {asset.rank}</p>
            <p>Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
