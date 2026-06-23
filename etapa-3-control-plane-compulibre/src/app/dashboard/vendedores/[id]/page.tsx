import { notFound } from "next/navigation";

import { fetchSellerProfileById } from "@/lib/seller-api";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-AR");
}

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let seller;

  try {
    seller = await fetchSellerProfileById(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Vendedor
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          {seller.storeName}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Ultima actualizacion: {formatDate(seller.updatedAt)}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">
            Datos principales
          </h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">ID</dt>
              <dd className="break-all font-medium text-gray-950">
                {seller.id}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Store name</dt>
              <dd className="font-medium text-gray-950">
                {seller.storeName}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-gray-500">Contact email</dt>
              <dd className="font-medium text-gray-950">
                {seller.contactEmail}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Operacion</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Productos</dt>
              <dd className="font-medium text-gray-950">
                {seller.productsCount ?? 0}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Ordenes</dt>
              <dd className="font-medium text-gray-950">
                {seller.ordersCount ?? 0}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Onboarding</dt>
              <dd className="font-medium text-gray-950">
                {seller.onboardingCompleted ? "Completo" : "Pendiente"}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Direccion</h2>
        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-gray-500">Address</dt>
            <dd className="mt-1 font-medium text-gray-950">
              {seller.sellerAddress ?? "Sin direccion"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Postal code</dt>
            <dd className="mt-1 font-medium text-gray-950">
              {seller.postalCode ?? "Sin codigo postal"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Fechas</h2>
        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-gray-500">Creacion</dt>
            <dd className="mt-1 font-medium text-gray-950">
              {formatDate(seller.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Actualizacion</dt>
            <dd className="mt-1 font-medium text-gray-950">
              {formatDate(seller.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
