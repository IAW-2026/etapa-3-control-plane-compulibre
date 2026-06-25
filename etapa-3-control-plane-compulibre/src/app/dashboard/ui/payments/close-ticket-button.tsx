"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { closeTicketFromForm } from "@/lib/payment-actions";

export function CloseTicketButton({ ticketId }: { ticketId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTicketWithId = closeTicketFromForm.bind(null, ticketId);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
      >
        <CheckIcon className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Cerrar</span>
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
            aria-labelledby={`close-ticket-title-${ticketId}`}
          >
            <h2
              id={`close-ticket-title-${ticketId}`}
              className="text-lg font-semibold text-primary"
            >
              Cerrar ticket
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Estas seguro de que queres cerrar el ticket{" "}
              <span className="font-semibold text-gray-950">{ticketId}</span>?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-secondary"
              >
                Cancelar
              </button>
              <form action={closeTicketWithId}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  <CheckIcon className="h-4 w-4" aria-hidden="true" />
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
