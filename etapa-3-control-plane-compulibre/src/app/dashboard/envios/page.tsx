import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Pagination } from "@/app/dashboard/ui/pagination";
import { Search } from "@/app/dashboard/ui/search";
import { ShipmentStatusFilter } from "@/app/dashboard/ui/shipping/shipment-status-filter";
import { ShipmentsTable } from "@/app/dashboard/ui/shipping/shipments-table";
import { getCurrentPage } from "@/lib/pagination";
import { fetchShipments } from "@/lib/shipping-api";

export default async function ShipmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const query = params.q ?? "";
  const status = params.status ?? "";
  const { shipments, pagination } = await fetchShipments({
    query,
    status,
    page: currentPage,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Shipping
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          Envios registrados
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Seguimiento global de envios creados por la Shipping App.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Search
          placeholder="Buscar envios..."
          queryParam="q"
          inputId="shipments-search"
        />
        <Link
          href="/dashboard/envios/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-highlight px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-highlight/85"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          <span>Crear envio</span>
        </Link>
      </div>

      <ShipmentStatusFilter status={status} query={query} />

      <ShipmentsTable shipments={shipments} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        basePath="/dashboard/envios"
        extraParams={{ q: query, status }}
      />
    </div>
  );
}
