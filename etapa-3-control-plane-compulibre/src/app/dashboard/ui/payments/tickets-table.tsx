import { getTicketStatusLabel } from "@/lib/payments-labels";
import type { Ticket } from "@/lib/payments-api";

import { CloseTicketButton } from "./close-ticket-button";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

export function TicketsTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {tickets.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm lg:min-w-220">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">Ticket</th>
                <th className="px-3 py-3 font-semibold md:px-5">Comprador</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Transaccion
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Fecha
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Estado
                </th>
                <th className="px-3 py-3 md:px-5">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {tickets.map((ticket) => {
                const canClose = ticket.status === "OPEN";

                return (
                  <tr key={ticket.id}>
                    <td className="px-3 py-4 md:px-5">
                      <p className="font-medium text-gray-950">
                        {ticket.subject}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {ticket.message}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-gray-600 md:px-5">
                      {ticket.buyerId}
                    </td>
                    <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                      {ticket.transactionId}
                    </td>
                    <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                      {formatDate(ticket.createdAt)}
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <span className="inline-flex whitespace-nowrap rounded-md bg-accent/50 px-2 py-1 text-xs font-semibold text-primary">
                        {getTicketStatusLabel(ticket.status)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right md:px-5">
                      {canClose ? (
                        <CloseTicketButton ticketId={ticket.id} />
                      ) : (
                        <span className="text-sm font-semibold text-gray-400">
                          Cerrado
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay tickets para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
