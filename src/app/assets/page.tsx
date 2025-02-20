import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";

import { WalletList } from "@/components/WalletList";
import { getAssets, getWallet } from "@/queries/queries";
import { AssetItem } from "../../components/AssetItem";

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
              <TableRow key={asset.ticker}>
                <TableCell>
                  <AssetItem asset={asset} />
                </TableCell>
                <TableCell>R$ {asset.price}</TableCell>
                <TableCell>
                  <Button
                    color="light"
                    as={Link}
                    href={`/assets/${asset.ticker}?walletId=${walletId}`}
                    className="w-fit"
                  >
                    Comprar / Vender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
