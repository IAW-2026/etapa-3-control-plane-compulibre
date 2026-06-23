import { Pagination } from "@/app/dashboard/ui/pagination";
import { StatusFilter } from "@/app/dashboard/ui/payments/status-filter";
import { WithdrawalsTable } from "@/app/dashboard/ui/payments/withdrawals-table";
import { getCurrentPage } from "@/lib/pagination";
import { fetchWithdrawals } from "@/lib/payments-api";
import { getWithdrawalStatusLabel } from "@/lib/payments-labels";

const WITHDRAWAL_STATUSES = ["PROCESSING", "COMPLETED", "REJECTED"];

export default async function WithdrawalsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const status = params.status ?? "";
  const { withdrawals, pagination } = await fetchWithdrawals({
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
          <h1 className="mt-2 text-3xl font-bold text-primary">Retiros</h1>
          <p className="mt-2 text-sm text-gray-600">
            Control centralizado de solicitudes de retiro de la app de pagos.
          </p>
        </div>
      </header>

      <StatusFilter
        basePath="/dashboard/retiros"
        status={status}
        options={WITHDRAWAL_STATUSES.map((value) => ({
          value,
          label: getWithdrawalStatusLabel(value),
        }))}
      />

      <WithdrawalsTable withdrawals={withdrawals} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        basePath="/dashboard/retiros"
        extraParams={{ status }}
      />
    </div>
  );
}
