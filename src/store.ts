import { create } from "zustand";

export type AssetStore = {
  assets: Asset[];
  changeAsset: (asset: Asset) => void;
};

export const useAssetStore = create<AssetStore>(set => ({
  assets: [],
  changeAsset: (asset: Asset) =>
    set(state => {
      const assetIndex = state.assets.findIndex(
        item => item.ticker === asset.ticker,
      );

      if (assetIndex === -1) return { assets: [...state.assets, asset] };

      const newAssets = [...state.assets];
      newAssets[assetIndex] = asset;

      return { assets: newAssets };
    }),
}));
