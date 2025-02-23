import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

import { AssetsSync } from "@/components/AssetsSync";
import { TableWalletAssetRow } from "@/components/TableWalletAssetRow";
import { WalletList } from "@/components/WalletList";
import { getWallet } from "@/queries/queries";

export default async function MyWalletPage({
  searchParams,
}: {
  searchParams: Promise<{ walletId: string }>;
}) {
  const { walletId } = await searchParams;
  if (!walletId) return <WalletList />;

  const wallet = await getWallet(walletId);
  if (!wallet) return <WalletList />;

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>

      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map(walletAsset => (
              <TableWalletAssetRow
                key={walletAsset.asset.ticker}
                walletAsset={walletAsset}
                walletId={walletId}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <AssetsSync
        assetsTickers={wallet.assets.map(
          walletAsset => walletAsset.asset.ticker,
        )}
      />
    </div>
  );
}
