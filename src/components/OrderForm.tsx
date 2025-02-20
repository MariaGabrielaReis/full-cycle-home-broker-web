import { OrderType } from "@/app/enums";
import { Button, Label, TextInput } from "flowbite-react";

export function OrderForm(props: {
  asset: Asset;
  walletId: string;
  type: OrderType;
}) {
  const color = props.type === OrderType.BUY ? "text-blue-600" : "text-red-600";
  const translatedType = props.type === OrderType.BUY ? "compra" : "venda";

  return (
    <form>
      <input type="hidden" name="assetId" defaultValue={props.asset._id} />{" "}
      <input type="hidden" name="walletId" defaultValue={props.walletId} />
      <input type="hidden" name="type" defaultValue={props.type} />
      <div className="flex flex-col gap-2">
        <Label htmlFor="shares" value="Quantidade" color={color} />
        <TextInput
          id="shares"
          name="shares"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={props.type === OrderType.BUY ? "info" : "failure"}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Label htmlFor="price" value="Preço (R$)" color={color} />
        <TextInput
          id="price"
          name="price"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={props.type === OrderType.BUY ? "info" : "failure"}
        />
      </div>
      <Button
        type="submit"
        color={props.type === OrderType.BUY ? "blue" : "failure"}
        className="w-full mt-4"
      >
        Confirmar {translatedType}
      </Button>
    </form>
  );
}
