import AssetDetail from "./AssetDetail";

async function fetchAssetDetails(id: string) {
  try {
    const res = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch asset details: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error:any) {
    console.error("Error fetching asset details:", error.message);
    return null; // Return null to indicate failure
  }
}

async function fetchAssetHistory(id: string) {
  try {
    const res = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch asset history: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data.slice(-30); // Limit to the last 30 days of history
  } catch (error: any) {
    console.error("Error fetching asset history:", error.message);
    return []; // Return empty array to avoid crashes
  }
}


export default async function AssetDetailWithData({ id }: { id: string }) {
  const asset = await fetchAssetDetails(id);
  const history = await fetchAssetHistory(id);

  if (!asset) {
    return <p className="text-red-500">Error: Asset details not found.</p>;
  }

  return <AssetDetail asset={asset} history={history} />;
}
