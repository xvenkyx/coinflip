import AssetDetail from "./AssetDetail";

async function fetchAssetDetails(id: string) {
  const res = await fetch(`https://api.coincap.io/v2/assets/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch asset details for ID: ${id}`);
  }
  const data = await res.json();
  return data.data;
}

async function fetchAssetHistory(id: string) {
  const res = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`);
  if (!res.ok) {
    throw new Error(`Failed to fetch asset history for ID: ${id}`);
  }
  const data = await res.json();
  return data.data;
}

export default async function AssetDetailWithData({ id }: { id: string }) {
  const asset = await fetchAssetDetails(id);
  const history = await fetchAssetHistory(id);

  return <AssetDetail asset={asset} history={history} />;
}
