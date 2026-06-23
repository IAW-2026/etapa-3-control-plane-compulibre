import { getWithdrawalStatusLabel } from "@/lib/payments-labels";
import type { Withdrawal } from "@/lib/payments-api";

import { ResolveWithdrawalButton } from "./resolve-withdrawal-button";

function formatAmount(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function WithdrawalsTable({
  withdrawals,
}: {
  withdrawals: Withdrawal[];
}) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {withdrawals.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm lg:min-w-200">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">Retiro</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Cuenta
                </th>
                <th className="px-3 py-3 font-semibold md:px-5">Monto</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  CBU destino
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
              {withdrawals.map((withdrawal) => {
                const canResolve = withdrawal.status === "PROCESSING";

                return (
                  <tr key={withdrawal.id}>
                    <td className="px-3 py-4 font-medium text-gray-950 md:px-5">
                      {withdrawal.id}
                    </td>
                    <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                      {withdrawal.account_id}
                    </td>
                    <td className="px-3 py-4 font-semibold text-primary md:px-5">
                      {formatAmount(withdrawal.amount)}
                    </td>
                    <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                      {withdrawal.destination_cbu}
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <span className="inline-flex whitespace-nowrap rounded-md bg-accent/50 px-2 py-1 text-xs font-semibold text-primary">
                        {getWithdrawalStatusLabel(withdrawal.status)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right md:px-5">
                      {canResolve ? (
                        <div className="flex justify-end gap-2">
                          <ResolveWithdrawalButton
                            withdrawalId={withdrawal.id}
                            action="COMPLETED"
                          />
                          <ResolveWithdrawalButton
                            withdrawalId={withdrawal.id}
                            action="REJECTED"
                          />
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-gray-400">
                          Resuelto
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
            No hay retiros para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
