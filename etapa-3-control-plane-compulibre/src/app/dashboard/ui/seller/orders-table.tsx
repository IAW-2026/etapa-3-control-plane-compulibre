import Link from "next/link";

import { getOrderStatusLabel } from "@/lib/order-labels";
import type { SellerOrder } from "@/lib/seller-api";

import { TrackShipmentButton } from "./track-shipment-button";

function formatPrice(price: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export function OrdersTable({ orders }: { orders: SellerOrder[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {orders.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm lg:min-w-220">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">Orden</th>
                <th className="px-3 py-3 font-semibold md:px-5">Seller</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Comprador
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Items
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Total
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Estado
                </th>
                <th className="px-3 py-3 md:px-5">
                  <span className="sr-only">Envio</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-3 py-4 font-medium text-gray-950 md:px-5">
                    <Link
                      href={`/dashboard/ventas/${order.id}`}
                      className="transition hover:text-primary"
                    >
                      {order.orderName}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-gray-600 md:px-5">
                    {order.sellerName}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                    {order.buyerName}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                    {order.itemsCount}
                  </td>
                  <td className="hidden px-5 py-4 font-semibold text-primary lg:table-cell">
                    {formatPrice(order.total)}
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span className="inline-flex whitespace-nowrap rounded-md bg-accent/50 px-2 py-1 text-xs font-semibold text-primary">
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-right md:px-5">
                    <TrackShipmentButton trackingId={order.trackingId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay ventas para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
