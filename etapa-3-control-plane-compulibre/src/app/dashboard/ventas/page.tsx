import { Pagination } from "@/app/dashboard/ui/pagination";
import { Search } from "@/app/dashboard/ui/search";
import { OrdersTable } from "@/app/dashboard/ui/seller/orders-table";
import { getCurrentPage } from "@/lib/pagination";
import { fetchSellerOrders } from "@/lib/seller-api";

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const query = params.query ?? "";
  const { orders, pagination } = await fetchSellerOrders({
    query,
    page: currentPage,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Seller
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          Ventas registradas
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Vista global de ordenes generadas por vendedores en CompuLibre.
        </p>
      </header>

      <Search placeholder="Buscar ventas..." />

      <OrdersTable orders={orders} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        query={query}
        basePath="/dashboard/ventas"
      />
    </div>
  );
}
