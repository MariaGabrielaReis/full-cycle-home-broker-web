import Image from "next/image";

export function AssetItem({ asset }: { asset: Asset }) {
  return (
    <div className="flex space-x-1">
      <div className="content-center">
        <Image
          src={asset.image_url}
          alt={asset.ticker}
          width={32}
          height={32}
        />
      </div>
      <div className="flex flex-col">
        <span>{asset.name}</span>
        <span className="text-xs">{asset.ticker}</span>
      </div>
    </div>
  );
}
