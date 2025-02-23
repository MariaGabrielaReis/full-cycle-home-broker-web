"use client";

import { socket } from "@/socket-io";
import { useAssetStore } from "@/store";
import { useEffect } from "react";

export function AssetsSync(props: { assetsTickers: string[] }) {
  const { assetsTickers } = props;

  const changeAsset = useAssetStore(stete => stete.changeAsset);

  useEffect(() => {
    socket.connect();

    socket.emit("join-assets", { tickers: assetsTickers });
    socket.on("assets/price-changed", (asset: Asset) => changeAsset(asset));

    return () => {
      socket.emit("leave-assets", { tickers: assetsTickers });
      socket.off("assets/price-changed");
    };
  }, [assetsTickers, changeAsset]);

  return null;
}
