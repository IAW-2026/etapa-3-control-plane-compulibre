"use server";

import { revalidatePath } from "next/cache";

import { closeTicket, resolveWithdrawal } from "./payments-api";

export async function completeWithdrawalFromForm(payoutId: string) {
  await resolveWithdrawal({ payoutId, action: "COMPLETED" });
  revalidatePath("/dashboard/retiros");
}

export async function rejectWithdrawalFromForm(payoutId: string) {
  await resolveWithdrawal({ payoutId, action: "REJECTED" });
  revalidatePath("/dashboard/retiros");
}

export async function closeTicketFromForm(ticketId: string) {
  await closeTicket(ticketId);
  revalidatePath("/dashboard/tickets");
}
