import { Card, TabItem, Tabs } from "flowbite-react";

import { OrderType } from "@/app/enums";
import { AssetItem } from "@/components/AssetItem";
import { OrderForm } from "@/components/OrderForm";
import { WalletList } from "@/components/WalletList";
import { getAsset, getWallet } from "@/queries/queries";
import { AssetChart } from "./AssetChart";

export default async function AssetDetails({
  params,
  searchParams,
}: {
  params: Promise<{ assetTicker: string }>;
  searchParams: Promise<{ walletId: string }>;
}) {
  const { walletId } = await searchParams;
  if (!walletId) return <WalletList />;

  const wallet = await getWallet(walletId);
  if (!wallet) return <WalletList />;

  const { assetTicker } = await params;
  const asset = await getAsset(assetTicker);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetItem asset={asset} />
        <span className="ml-2 font-bold text-2xl">R$ {asset.price}</span>
      </div>

      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabItem
                active
                title={<span className="text-blue-600">Comprar</span>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.BUY}
                />
              </TabItem>
              <TabItem
                active
                title={<span className="text-red-600">Vender</span>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.SELL}
                />
              </TabItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChart asset={asset} />
        </div>
      </div>
    </div>
  );
}
