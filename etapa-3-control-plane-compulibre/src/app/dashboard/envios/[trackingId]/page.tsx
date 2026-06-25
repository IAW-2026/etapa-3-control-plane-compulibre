import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchShipmentByTrackingId } from "@/lib/shipping-api";
import { getShipmentStatusLabel } from "@/lib/shipping-labels";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

function EmptyValue({ children }: { children: string | null | undefined }) {
  return <>{children || "Sin dato"}</>;
}

export default async function ShipmentPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;
  let shipment;

  try {
    shipment = await fetchShipmentByTrackingId(trackingId);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-4 border-b border-primary/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
            Envio
          </p>
          <h1 className="mt-2 break-all text-3xl font-bold text-primary">
            {shipment.trackingId}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Detalle global del envio registrado en Shipping App.
          </p>
        </div>

        {shipment.labelUrl ? (
          <Link
            href={shipment.labelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-accent/35"
          >
            Abrir etiqueta
            <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Estado</p>
          <p className="mt-2 text-lg font-semibold text-primary">
            {getShipmentStatusLabel(shipment.status)}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Courier</p>
          <p className="mt-2 text-lg font-semibold text-gray-950">
            {shipment.courier}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Creacion</p>
          <p className="mt-2 text-lg font-semibold text-gray-950">
            {formatDate(shipment.createdAt)}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Actualizacion</p>
          <p className="mt-2 text-lg font-semibold text-gray-950">
            {formatDate(shipment.updatedAt)}
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Referencias</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Tracking externo</dt>
              <dd className="break-all font-medium text-gray-950">
                <EmptyValue>{shipment.externalTrackingId}</EmptyValue>
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Orden seller</dt>
              <dd className="break-all font-medium text-gray-950">
                {shipment.externalSellerOrderId}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Seller ID</dt>
              <dd className="break-all font-medium text-gray-950">
                <EmptyValue>{shipment.externalSellerId}</EmptyValue>
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Orden buyer</dt>
              <dd className="break-all font-medium text-gray-950">
                {shipment.externalBuyerOrderId}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Direcciones</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Origen</dt>
              <dd className="mt-1 font-medium text-gray-950">
                <EmptyValue>{shipment.originAddress}</EmptyValue>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Destino</dt>
              <dd className="mt-1 font-medium text-gray-950">
                <EmptyValue>{shipment.destinationAddress}</EmptyValue>
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white shadow-sm">
        <div className="border-b border-primary/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-primary">
            Historial de eventos
          </h2>
        </div>

        {shipment.events && shipment.events.length > 0 ? (
          <ol className="divide-y divide-primary/10">
            {shipment.events.map((event) => (
              <li key={event.id} className="grid gap-2 px-5 py-4 md:grid-cols-4">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {getShipmentStatusLabel(event.statusUpdate)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDate(event.timestamp)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 md:col-span-3">
                  <EmptyValue>{event.location}</EmptyValue>
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay eventos para mostrar.
          </p>
        )}
      </section>
    </div>
  );
}
