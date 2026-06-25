import { notFound } from "next/navigation";

import { TrackShipmentButton } from "@/app/dashboard/ui/seller/track-shipment-button";
import { getOrderStatusLabel } from "@/lib/order-labels";
import { fetchSellerOrderById } from "@/lib/seller-api";

function formatPrice(price: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-AR");
}

export default async function SalePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let sale;

  try {
    sale = await fetchSellerOrderById(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-4 border-b border-primary/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
            Venta
          </p>
          <h1 className="mt-2 text-3xl font-bold text-primary">
            {sale.orderName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Detalle global de la orden registrada en Seller App.
          </p>
        </div>
        <TrackShipmentButton trackingId={sale.trackingId} />
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Seller</p>
          <p className="mt-2 truncate text-lg font-semibold text-gray-950">
            {sale.sellerName}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Comprador</p>
          <p className="mt-2 truncate text-lg font-semibold text-gray-950">
            {sale.buyerName}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Estado</p>
          <p className="mt-2 text-lg font-semibold text-primary">
            {getOrderStatusLabel(sale.status)}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total</p>
          <p className="mt-2 text-lg font-semibold text-primary">
            {formatPrice(sale.total)}
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">
            Direccion de entrega
          </h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Direccion</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {sale.buyerAddress ?? "Sin direccion"}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Codigo postal</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {sale.buyerPostalCode ?? "Sin codigo postal"}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Envio</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Tracking</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {sale.trackingId ?? "Sin tracking generado"}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Origen</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {sale.originAddress ?? "Sin direccion de origen"}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
        <div className="border-b border-primary/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-primary">Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Producto</th>
                <th className="px-5 py-3 font-semibold">Marca</th>
                <th className="px-5 py-3 font-semibold">Cantidad</th>
                <th className="px-5 py-3 font-semibold">Precio unitario</th>
                <th className="px-5 py-3 font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {sale.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 font-medium text-gray-950">
                    {item.productName}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{item.brand}</td>
                  <td className="px-5 py-4 text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    {formatPrice(
                      (Number(item.price) * item.quantity).toFixed(2)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">
          Referencias externas
        </h2>
        <dl className="mt-4 grid gap-3 text-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-gray-500">Buyer order id</dt>
            <dd className="font-medium text-gray-950">
              {sale.externalBuyerOrderId}
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-gray-500">Transaccion</dt>
            <dd className="font-medium text-gray-950">
              {sale.transactionId ?? "Sin referencia"}
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-gray-500">Fecha</dt>
            <dd className="font-medium text-gray-950">
              {formatDate(sale.createdAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
