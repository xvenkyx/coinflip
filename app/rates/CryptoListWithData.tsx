import CryptoList from "./CryptoList";

async function fetchAssets() {
  const res = await fetch("https://api.coincap.io/v2/assets", {
    cache: "no-store", // Disable caching for fresh data
  });
  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }
  const data = await res.json();
  return data.data;
}

export default async function CryptoListWithData() {
  const assets = await fetchAssets();
  return <CryptoList assets={assets} />;
}
