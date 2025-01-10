"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CryptoList({ assets }: { assets: any[] }) {
  //websocket - start
  const [prices, setPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    ws.onmessage = (event) => {
      const updatedPrices = JSON.parse(event.data);
      setPrices((prevPrices) => ({ ...prevPrices, ...updatedPrices }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws.close(); // Clean up the WebSocket connection on component unmount
  }, []);
  //websocket - end

  const iconUrl = (symbol: string) =>
    `/icons/color/${symbol.toLowerCase()}.svg`;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => {
        const updatedPrice = prices[asset.id] || asset.priceUsd;
        const priceChange =
          parseFloat(updatedPrice) - parseFloat(asset.priceUsd);
        return (
          <Link
            key={asset.id}
            href={`/rates/${asset.id}`}
            className="p-4 border rounded-lg hover:shadow-lg transition-transform transform hover:scale-105 bg-white"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={iconUrl(asset.symbol)}
                alt={asset.name}
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/icons/color/dcn.svg";
                }}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {asset.name}
                </h2>
                <p className="text-sm text-gray-600">Symbol: {asset.symbol}</p>
                <p className="text-sm text-gray-600">Rank: #{asset.rank}</p>
              </div>
            </div>
            <div className="mt-4 text-right">
              {/* <p className="text-lg font-semibold text-green-500">
                ${parseFloat(asset.priceUsd).toFixed(2)}
              </p> */}
              <p
                className={`text-lg font-semibold ${
                  priceChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${parseFloat(updatedPrice).toFixed(2)}
              </p>
              <p className="text-sm">
                {priceChange !== 0 && (
                  <>
                    {priceChange > 0 ? "▲" : "▼"}{" "}
                    {Math.abs(priceChange).toFixed(2)}
                  </>
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
