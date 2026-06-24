import { notFound } from "next/navigation";

import { BuyerActionButton } from "@/app/dashboard/ui/buyer/buyer-action-button";
import { getBuyerStatusLabel } from "@/lib/buyer-labels";
import { fetchBuyerProfileById } from "@/lib/buyer-api";

function formatDate(date?: string) {
  if (!date) {
    return "Sin dato";
  }

  return new Date(date).toLocaleDateString("es-AR");
}

export default async function BuyerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let buyer;

  try {
    buyer = await fetchBuyerProfileById(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="border-b border-primary/10 pb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Comprador
        </p>
        <h1 className="mt-2 break-all text-3xl font-bold text-primary">
          {buyer.fullName}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Perfil de comprador registrado en Buyer App.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">ID</p>
          <p className="mt-2 break-all text-lg font-semibold text-gray-950">
            {buyer.id}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Estado</p>
          <p className="mt-2 text-lg font-semibold text-primary">
            {getBuyerStatusLabel(buyer.isActive)}
          </p>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Actualizacion</p>
          <p className="mt-2 text-lg font-semibold text-gray-950">
            {formatDate(buyer.updatedAt)}
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">
            Datos principales
          </h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Nombre completo</dt>
              <dd className="font-medium text-gray-950">{buyer.fullName}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Creacion</dt>
              <dd className="font-medium text-gray-950">
                {formatDate(buyer.createdAt)}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Direccion</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Direccion de envio</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {buyer.defaultShippingAddress ?? "Sin direccion"}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Codigo postal</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {buyer.defaultPostalCode ?? "Sin codigo postal"}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">
          Acciones administrativas
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Estas acciones modifican datos del comprador en Buyer App.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <BuyerActionButton
            buyerId={buyer.id}
            buyerName={buyer.fullName}
            action="toggle-status"
          />
          <BuyerActionButton
            buyerId={buyer.id}
            buyerName={buyer.fullName}
            action="reset-form"
          />
          <BuyerActionButton
            buyerId={buyer.id}
            buyerName={buyer.fullName}
            action="reset-orders"
          />
          <BuyerActionButton
            buyerId={buyer.id}
            buyerName={buyer.fullName}
            action="reset-all"
          />
        </div>
      </section>
    </div>
  );
}
