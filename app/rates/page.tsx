import { Suspense } from "react";
import CryptoListWithData from "./CryptoListWithData";

export default function RatesPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Rates</h1>
      <Suspense fallback={<p>Loading cryptocurrencies...</p>}>
        <CryptoListWithData />
      </Suspense>
    </main>
  );
}
