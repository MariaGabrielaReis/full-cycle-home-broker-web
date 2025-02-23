type Asset = {
  _id: string;
  name: string;
  ticker: string;
  price: number;
  image_url: string;
};

type AssetDaily = {
  _id: string;
  asset: Asset;
  date: string;
  price: number;
};

type WalletAsset = {
  _id: string;
  asset: Asset;
  shares: number;
};

type Wallet = {
  _id: string;
  assets: WalletAsset[];
};

type Order = {
  _id: string;
  asset: Asset;
  shares: number;
  partial: number;
  price: number;
  type: OrderType;
  status: OrderStatus;
};
