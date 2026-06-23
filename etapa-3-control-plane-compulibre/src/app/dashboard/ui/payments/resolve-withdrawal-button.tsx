"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  completeWithdrawalFromForm,
  rejectWithdrawalFromForm,
} from "@/lib/payment-actions";

export function ResolveWithdrawalButton({
  withdrawalId,
  action,
}: {
  withdrawalId: string;
  action: "COMPLETED" | "REJECTED";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isCompleteAction = action === "COMPLETED";
  const submitAction = isCompleteAction
    ? completeWithdrawalFromForm.bind(null, withdrawalId)
    : rejectWithdrawalFromForm.bind(null, withdrawalId);
  const Icon = isCompleteAction ? CheckIcon : XMarkIcon;
  const label = isCompleteAction ? "Completar" : "Rechazar";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition",
          isCompleteAction
            ? "bg-primary text-white hover:bg-primary/90"
            : "border border-red-200 text-red-600 hover:bg-red-50",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{label} retiro</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setIsOpen(false);
            }
          }}
        >
          <section
            className="w-full max-w-md rounded-lg border border-primary/10 bg-white p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`withdrawal-action-title-${withdrawalId}-${action}`}
          >
            <h2
              id={`withdrawal-action-title-${withdrawalId}-${action}`}
              className="text-lg font-semibold text-primary"
            >
              {label} retiro
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Estas seguro de que queres {label.toLowerCase()} el retiro{" "}
              <span className="font-semibold text-gray-950">
                {withdrawalId}
              </span>
              ?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-secondary"
              >
                Cancelar
              </button>
              <form action={submitAction}>
                <button
                  type="submit"
                  className={[
                    "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition",
                    isCompleteAction
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-red-600 hover:bg-red-700",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  Confirmar
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
