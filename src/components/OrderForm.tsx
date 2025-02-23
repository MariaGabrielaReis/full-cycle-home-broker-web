"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

import { OrderType } from "@/app/enums";
import { socket } from "@/socket-io";

export function OrderForm(props: {
  asset: Asset;
  walletId: string;
  type: OrderType;
}) {
  const color = props.type === OrderType.BUY ? "text-blue-600" : "text-red-600";
  const translatedType = props.type === OrderType.BUY ? "compra" : "venda";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDta = new FormData(event.currentTarget);
    const data = Object.fromEntries(formDta.entries());
    socket.connect();
    const newOrder: Order = await socket.emitWithAck("orders/create", data);
    toast(
      `Ordem de ${translatedType} de ${newOrder.shares} ações de ${props.asset.ticker} criada com sucesso`,
      { type: "success", position: "top-right" },
    );
  }

  return (
    <form onSubmit={onSubmit}>
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
