"use client";

import { useRef } from "react";

import { AssetItem } from "@/components/AssetItem";
import { Chart, ChartComponentRef } from "@/components/Chart";

export function AssetChart(props: { asset: Asset }) {
  const chartRef = useRef<ChartComponentRef>(null);

  return <Chart ref={chartRef} header={<AssetItem asset={props.asset} />} />;
}
