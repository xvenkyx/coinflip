import CryptoList from "./CryptoList";

async function fetchAssets() {
  try {
    const res = await fetch("https://api.coincap.io/v2/assets", {
      cache: "no-store", // Disable caching for fresh data
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch assets: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error:any) {
    console.error("Error fetching assets:", error.message);
    return []; // Return empty array to avoid crashes
  }
}

export default async function CryptoListWithData() {
  const assets = await fetchAssets();

  if (!assets.length) {
    return <p className="text-red-500">Error: Unable to load cryptocurrencies. Please try again later.</p>;
  }

  return <CryptoList assets={assets} />;
}
