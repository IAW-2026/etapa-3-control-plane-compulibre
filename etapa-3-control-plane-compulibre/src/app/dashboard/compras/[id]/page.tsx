import { notFound } from "next/navigation";

import { getBuyerOrderStatusLabel } from "@/lib/buyer-labels";
import { fetchBuyerOrderById } from "@/lib/buyer-api";

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

export default async function PurchasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let purchase;

  try {
    purchase = await fetchBuyerOrderById(id);
  } catch {
    notFound();
  }

  const buyerName = purchase.buyer?.fullName ?? purchase.buyerId;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="border-b border-primary/10 pb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Compra
        </p>
        <h1 className="mt-2 break-all text-3xl font-bold text-primary">
          {purchase.id}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Detalle global de la orden registrada en Buyer App.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Comprador</p>
          <p className="mt-2 truncate text-lg font-semibold text-gray-950">
            {buyerName}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Estado</p>
          <p className="mt-2 text-lg font-semibold text-primary">
            {getBuyerOrderStatusLabel(purchase.status)}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total</p>
          <p className="mt-2 text-lg font-semibold text-primary">
            {formatPrice(purchase.totalAmount)}
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
        <div className="border-b border-primary/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-primary">Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Producto</th>
                <th className="px-5 py-3 font-semibold">Cantidad</th>
                <th className="px-5 py-3 font-semibold">Precio cacheado</th>
                <th className="px-5 py-3 font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {purchase.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 font-medium text-gray-950">
                    {item.productName}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {formatPrice(item.cachedPrice)}
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    {formatPrice(
                      (Number(item.cachedPrice) * item.quantity).toFixed(2)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Referencias</h2>
        <dl className="mt-4 grid gap-3 text-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-gray-500">Buyer ID</dt>
            <dd className="break-all font-medium text-gray-950">
              {purchase.buyerId}
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-gray-500">Creacion</dt>
            <dd className="font-medium text-gray-950">
              {formatDate(purchase.createdAt)}
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <dt className="text-gray-500">Actualizacion</dt>
            <dd className="font-medium text-gray-950">
              {formatDate(purchase.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
