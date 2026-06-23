import { Pagination } from "@/app/dashboard/ui/pagination";
import { StatusFilter } from "@/app/dashboard/ui/payments/status-filter";
import { TicketsTable } from "@/app/dashboard/ui/payments/tickets-table";
import { getCurrentPage } from "@/lib/pagination";
import { fetchTickets } from "@/lib/payments-api";
import { getTicketStatusLabel } from "@/lib/payments-labels";

const TICKET_STATUSES = ["OPEN", "CLOSED"];

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const status = params.status ?? "";
  const { tickets, pagination } = await fetchTickets({
    status,
    page: currentPage,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
            Payments
          </p>
          <h1 className="mt-2 text-3xl font-bold text-primary">Tickets</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestion de reclamos y solicitudes provenientes de la app de pagos.
          </p>
        </div>
      </header>

      <StatusFilter
        basePath="/dashboard/tickets"
        status={status}
        options={TICKET_STATUSES.map((value) => ({
          value,
          label: getTicketStatusLabel(value),
        }))}
      />

      <TicketsTable tickets={tickets} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        basePath="/dashboard/tickets"
        extraParams={{ status }}
      />
    </div>
  );
}
