import Link from "next/link";

import { getBuyerOrderStatusLabel } from "@/lib/buyer-labels";
import type { BuyerOrder } from "@/lib/buyer-api";

function formatPrice(price: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

function getBuyerName(order: BuyerOrder) {
  return order.buyer?.fullName ?? order.buyerId;
}

export function BuyerOrdersTable({ orders }: { orders: BuyerOrder[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {orders.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm lg:min-w-200">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">Compra</th>
                <th className="px-3 py-3 font-semibold md:px-5">
                  Comprador
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Estado
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Total
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-3 py-4 font-medium text-gray-950 md:px-5">
                    <Link
                      href={`/dashboard/compras/${order.id}`}
                      className="transition hover:text-primary"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-gray-600 md:px-5">
                    {getBuyerName(order)}
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span className="inline-flex whitespace-nowrap rounded-md bg-accent/50 px-2 py-1 text-xs font-semibold text-primary">
                      {getBuyerOrderStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 font-semibold text-primary md:table-cell">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay compras para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
