import { Suspense } from "react";
import AssetDetailWithData from "./AssetDetailWithData";

export default async function AssetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="p-4">
      <Suspense fallback={<p>Loading asset details...</p>}>
        <AssetDetailWithData id={id} />
      </Suspense>
    </main>
  );
}
