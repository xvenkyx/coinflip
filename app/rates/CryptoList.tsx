"use client";

import Link from "next/link";

export default function CryptoList({ assets }: { assets: any[] }) {
  const iconUrl = (symbol: string) =>
    `/icons/color/${symbol.toLowerCase()}.svg`;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <Link
          key={asset.id}
          href={`/rates/${asset.id}`}
          className="p-4 border rounded-lg hover:shadow-lg transition-transform transform hover:scale-105 bg-white"
        >
          <div className="flex items-center space-x-4">
            <img
              src={iconUrl(asset.symbol)}
              alt={asset.name}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/icons/color/default.svg"; // Fallback icon
              }}
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{asset.name}</h2>
              <p className="text-sm text-gray-600">Symbol: {asset.symbol}</p>
              <p className="text-sm text-gray-600">Rank: #{asset.rank}</p>
            </div>
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold text-green-500">
              ${parseFloat(asset.priceUsd).toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
