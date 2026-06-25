"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createShipment, type CreateShipmentInput } from "./shipping-api";

function readRequiredString(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`El campo ${field} es obligatorio`);
  }

  return value.trim();
}

function readShipmentInput(formData: FormData): CreateShipmentInput {
  return {
    sellerOrderId: readRequiredString(formData, "sellerOrderId"),
    buyerOrderId: readRequiredString(formData, "buyerOrderId"),
    sellerId: readRequiredString(formData, "sellerId"),
    externalTrackingId: readRequiredString(formData, "externalTrackingId"),
    buyerAddress: readRequiredString(formData, "buyerAddress"),
    originAddress: readRequiredString(formData, "originAddress"),
    courier: readRequiredString(formData, "courier"),
  };
}

export async function createShipmentFromForm(formData: FormData) {
  const shipment = await createShipment(readShipmentInput(formData));

  revalidatePath("/dashboard/envios");
  redirect(`/dashboard/envios/${shipment.trackingId}`);
}

