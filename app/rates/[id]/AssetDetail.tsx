"use client";

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

export default function AssetDetail({ asset, history }: { asset: any; history: any[] }) {
  const chartData = {
    labels: history.map((point) => new Date(point.time).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: history.map((point) => parseFloat(point.priceUsd)),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Details</h1>
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">{asset.name}</h2>
        <p>Symbol: {asset.symbol}</p>
        <p>Rank: {asset.rank}</p>
        <p>Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Price History</h2>
        <Line data={chartData} />
      </div>
    </main>
  );
}
