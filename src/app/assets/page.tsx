import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

import { AssetsSync } from "@/components/AssetsSync";
import { WalletList } from "@/components/WalletList";
import { getAssets, getWallet } from "@/queries/queries";
import { TableAssetRow } from "./TableAssetRow";

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ walletId: string }>;
}) {
  const assets = await getAssets();

  const { walletId } = await searchParams;
  if (!walletId) return <WalletList />;

  const wallet = await getWallet(walletId);
  if (!wallet) return <WalletList />;

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Ativos</h1>
      </article>

      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Comprar / Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map(asset => (
              <TableAssetRow
                key={asset.ticker}
                asset={asset}
                walletId={walletId}
              />
            ))}
          </TableBody>
        </Table>

        <AssetsSync assetsTickers={assets.map(asset => asset.ticker)} />
      </div>
    </div>
  );
}
