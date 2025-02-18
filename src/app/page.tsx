import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";

export async function getMyWallet(walletId: string): Promise<Wallet> {
  const response = await fetch(`http://localhost:3333/wallets/${walletId}`);
  return response.json();
}

export default async function MyWallet({
  searchParams,
}: {
  searchParams: Promise<{ walletId: string }>;
}) {
  const { walletId } = await searchParams;
  const wallet = await getMyWallet(walletId);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>My Wallet</h1>
      </article>

      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Asset</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map(walletAsset => (
              <TableRow key={walletAsset.asset.ticker}>
                <TableCell>
                  <div className="flex space-x-1">
                    <div className="content-center">
                      <Image
                        src={walletAsset.asset.image_url}
                        alt={walletAsset.asset.ticker}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>{walletAsset.asset.name}</span>
                      <span className="text-xs">
                        {walletAsset.asset.ticker}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$ {walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button color="light">Buy/Sell</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
