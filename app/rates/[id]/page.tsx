import AssetDetail from './AssetDetail';

export default async function AssetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await the params to unwrap the promise.

  const fetchAssetDetails = async (id: string) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch asset details for ID: ${id}`);
    }
    const data = await res.json();
    return data.data;
  };

  const fetchAssetHistory = async (id: string) => {
    const res = await fetch(
      `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch asset history for ID: ${id}`);
    }
    const data = await res.json();
    return data.data;
  };

  const asset = await fetchAssetDetails(id);
  const history = await fetchAssetHistory(id);

  return <AssetDetail asset={asset} history={history} />;
}
