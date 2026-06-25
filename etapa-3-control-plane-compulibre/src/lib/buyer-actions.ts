"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  resetBuyerAll,
  resetBuyerForm,
  resetBuyerOrders,
  toggleBuyerStatus,
} from "./buyer-api";

export async function toggleBuyerStatusFromForm(buyerId: string) {
  await toggleBuyerStatus(buyerId);
  revalidatePath("/dashboard/compradores");
  revalidatePath(`/dashboard/compradores/${buyerId}`);
}

export async function resetBuyerFormFromForm(buyerId: string) {
  await resetBuyerForm(buyerId);
  revalidatePath("/dashboard/compradores");
  revalidatePath(`/dashboard/compradores/${buyerId}`);
}

export async function resetBuyerOrdersFromForm(buyerId: string) {
  await resetBuyerOrders(buyerId);
  revalidatePath("/dashboard/compras");
  revalidatePath(`/dashboard/compradores/${buyerId}`);
}

export async function resetBuyerAllFromForm(buyerId: string) {
  await resetBuyerAll(buyerId);
  revalidatePath("/dashboard/compradores");
  revalidatePath("/dashboard/compras");
  redirect("/dashboard/compradores");
}
