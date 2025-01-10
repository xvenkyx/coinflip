import CryptoList from "./CryptoList";

async function fetchAssets() {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets", {
      next: { revalidate: 60 }, // Cache for 60 seconds, with revalidation
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch assets: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    console.error("Error fetching assets:", error.message);
    return [];
  }
}

export default async function CryptoListWithData() {
  const assets = await fetchAssets();

  if (!assets.length) {
    return <p className="text-red-500">Error: Unable to load cryptocurrencies. Please try again later.</p>;
  }

  return <CryptoList assets={assets} />;
}
