import { BuyerOrdersTable } from "@/app/dashboard/ui/buyer/buyer-orders-table";
import { Pagination } from "@/app/dashboard/ui/pagination";
import { Search } from "@/app/dashboard/ui/search";
import { fetchBuyerOrders } from "@/lib/buyer-api";
import { getCurrentPage } from "@/lib/pagination";

export default async function PurchasesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const search = params.search ?? "";
  const { orders, pagination } = await fetchBuyerOrders({
    search,
    page: currentPage,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Buyer
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          Compras registradas
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Ordenes generadas por compradores en la Buyer App.
        </p>
      </header>

      <Search
        placeholder="Buscar compras..."
        queryParam="search"
        inputId="purchases-search"
      />

      <BuyerOrdersTable orders={orders} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        basePath="/dashboard/compras"
        extraParams={{ search }}
      />
    </div>
  );
}
