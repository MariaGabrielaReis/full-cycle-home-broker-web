"use client";

import { Button, TableCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

import { AssetItem } from "@/components/AssetItem";
import { useAssetStore } from "@/store";

export function TableAssetRow({
  asset,
  walletId,
}: {
  asset: Asset;
  walletId: string;
}) {
  const assetFound = useAssetStore(
    useShallow(state =>
      state.assets.find(item => item.ticker === asset.ticker),
    ),
  );

  const currentAsset = assetFound || asset;

  return (
    <TableRow>
      <TableCell>
        <AssetItem asset={currentAsset} />
      </TableCell>
      <TableCell>R$ {currentAsset.price}</TableCell>
      <TableCell>
        <Button
          color="light"
          as={Link}
          href={`/assets/${currentAsset.ticker}?walletId=${walletId}`}
          className="w-fit"
        >
          Comprar / Vender
        </Button>
      </TableCell>
    </TableRow>
  );
}
