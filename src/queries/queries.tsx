export async function getAssets(): Promise<Asset[]> {
  const response = await fetch(`http://localhost:3333/assets`);
  return response.json();
}

export async function getAsset(ticker: string): Promise<Asset> {
  const response = await fetch(`http://localhost:3333/assets/${ticker}`);
  return response.json();
}

export async function getWallet(walletId: string): Promise<Wallet | null> {
  const response = await fetch(`http://localhost:3333/wallets/${walletId}`);

  if (!response.ok) return null;

  return response.json();
}

export async function getOrders(walletId: string): Promise<Order[]> {
  const response = await fetch(
    `http://localhost:3333/orders?walletId=${walletId}`,
  );
  return response.json();
}

export async function getAssetDailies(
  assetTicker: string,
): Promise<AssetDaily[]> {
  const response = await fetch(
    `http://localhost:3333/assets/${assetTicker}/dailies`,
  );
  return response.json();
}
