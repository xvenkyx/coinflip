"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AssetDetail({
  asset,
  history,
}: {
  asset: any;
  history: any[];
}) {
  const router = useRouter();

  // Websocket - start
  const [price, setPrice] = useState(asset.priceUsd);

  useEffect(() => {
    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${asset.id}`);

    ws.onmessage = (event) => {
      const updatedPrices = JSON.parse(event.data);
      if (updatedPrices[asset.id]) {
        setPrice(updatedPrices[asset.id]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws.close(); // Clean up WebSocket connection on unmount
  }, [asset.id]);
  // Websocket - end

  const chartData = history.length
    ? {
        labels: history.map((point) => new Date(point.time).toLocaleDateString()),
        datasets: [
          {
            label: "Price (USD)",
            data: history.map((point) => parseFloat(point.priceUsd)),
            borderColor: "rgba(34, 202, 236, 1)",
            backgroundColor: "rgba(34, 202, 236, 0.2)",
            tension: 0.4,
            pointRadius: 2, // Reduce point size for better performance
          },
        ],
      }
    : null;

  return (
    <main className="p-4 bg-gray-50 min-h-screen">

      {/* SVG from Heroicons */}
      <button
        onClick={() => router.push("/rates")}
        className="mb-4 flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all group"
        title="Back to Rates"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="hidden sm:block text-sm font-medium">
          Back
        </span>
      </button>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{asset.name}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Symbol:</p>
            <p className="text-lg font-bold text-gray-800">{asset.symbol}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Rank:</p>
            <p className="text-lg font-bold text-gray-800">#{asset.rank}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Price:</p>
            <p className="text-lg font-bold text-green-600">${parseFloat(price).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">24h Change:</p>
            <p
              className={`text-lg font-bold ${
                parseFloat(asset.changePercent24Hr) > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(asset.changePercent24Hr).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Price History</h2>
        <div className="w-full max-w-full">
          {/* <Line
            data={chartData}
            options={{
              maintainAspectRatio: false, // Allow the chart to resize responsively
              responsive: true,
            }}
            height={300}
          /> */}
          {chartData ? (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
            height={300}
          />
        ) : (
          <p className="text-gray-500">No price history available.</p>
        )}
        </div>
      </div>
    </main>
  );
}
