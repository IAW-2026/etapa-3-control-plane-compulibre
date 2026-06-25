import { getBuyerStatusLabel } from "@/lib/buyer-labels";
import type { BuyerProfile } from "@/lib/buyer-api";
import Link from "next/link";

export function BuyersTable({ buyers }: { buyers: BuyerProfile[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {buyers.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm md:min-w-180">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">ID</th>
                <th className="px-3 py-3 font-semibold md:px-5">
                  Comprador
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Direccion
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Codigo postal
                </th>
                <th className="px-3 py-3 font-semibold md:px-5">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {buyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td className="max-w-32 px-3 py-4 font-medium text-gray-950 md:max-w-none md:px-5">
                    <Link
                      href={`/dashboard/compradores/${buyer.id}`}
                      className="block truncate transition hover:text-primary"
                    >
                      {buyer.id}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-gray-600 md:px-5">
                    {buyer.fullName}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                    {buyer.defaultShippingAddress ?? "Sin direccion"}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                    {buyer.defaultPostalCode ?? "Sin codigo postal"}
                  </td>
                  <td className="px-3 py-4 md:px-5">
                    <span className="inline-flex whitespace-nowrap rounded-md bg-accent/50 px-2 py-1 text-xs font-semibold text-primary">
                      {getBuyerStatusLabel(buyer.isActive)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay compradores para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
