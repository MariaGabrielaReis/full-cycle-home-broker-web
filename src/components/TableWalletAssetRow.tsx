"use client";

import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

import { useAssetStore } from "@/store";
import { AssetItem } from "./AssetItem";

export function TableWalletAssetRow({
  walletAsset,
  walletId,
}: {
  walletAsset: WalletAsset;
  walletId: string;
}) {
  const assetFound = useAssetStore(
    useShallow(state =>
      state.assets.find(item => item.ticker === walletAsset.asset.ticker),
    ),
  );

  const asset = assetFound || walletAsset.asset;

  return (
    <TableRow>
      <TableCell>
        <AssetItem asset={asset} />
      </TableCell>
      <TableCell>R$ {asset.price}</TableCell>
      <TableCell>{walletAsset.shares}</TableCell>
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
  );
}
