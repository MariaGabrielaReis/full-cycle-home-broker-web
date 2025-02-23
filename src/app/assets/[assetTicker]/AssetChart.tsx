"use client";

import { Time } from "lightweight-charts";
import { useEffect, useRef } from "react";

import { AssetItem } from "@/components/AssetItem";
import { Chart, ChartComponentRef } from "@/components/Chart";
import { socket } from "@/socket-io";

export function AssetChart({
  asset,
  data,
}: {
  asset: Asset;
  data?: { time: Time; value: number }[];
}) {
  const chartRef = useRef<ChartComponentRef>(null);
  const ticker = asset.ticker;

  useEffect(() => {
    socket.connect();
    socket.emit("join-asset", { ticker });
    socket.on("assets/daily-created", assetDaily => {
      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: assetDaily.price,
      });
    });
  }, [ticker]);

  return (
    <Chart ref={chartRef} header={<AssetItem asset={asset} />} data={data} />
  );
}
