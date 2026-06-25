import { getShipmentStatusLabel } from "@/lib/shipping-labels";
import type { Shipment } from "@/lib/shipping-api";
import Link from "next/link";

export function ShipmentsTable({ shipments }: { shipments: Shipment[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {shipments.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm lg:min-w-220">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">
                  Tracking ID
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Orden seller
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Orden buyer
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Courier
                </th>
                <th className="px-3 py-3 font-semibold md:px-5">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {shipments.map((shipment) => (
                <tr key={shipment.trackingId}>
                  <td className="px-3 py-4 font-medium text-gray-950 md:px-5">
                    <Link
                      href={`/dashboard/envios/${shipment.trackingId}`}
                      className="transition hover:text-primary"
                    >
                      {shipment.trackingId}
                    </Link>
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                    {shipment.externalSellerOrderId}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                    {shipment.externalBuyerOrderId}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                    {shipment.courier}
                  </td>
                  <td className="px-3 py-4 md:px-5">
                    <span className="inline-flex whitespace-nowrap rounded-md bg-accent/50 px-2 py-1 text-xs font-semibold text-primary">
                      {getShipmentStatusLabel(shipment.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay envios para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
