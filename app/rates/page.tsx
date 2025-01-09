// app/rates/page.tsx (Server Component)
import Link from "next/link";
import CryptoList from './CryptoList';

export default async function RatesPage() {
  const fetchAssets = async () => {
    const res = await fetch('https://api.coincap.io/v2/assets');
    if (!res.ok) {
      throw new Error('Failed to fetch assets');
    }
    const data = await res.json();
    return data.data;
  };

  const assets = await fetchAssets();

  return (
    <main className="p-4">
      <Link href="/" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">Crypto Rates</h1>
      <CryptoList assets={assets} />
    </main>
  );
}
