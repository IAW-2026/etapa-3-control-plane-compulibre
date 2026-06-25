import { Pagination } from "@/app/dashboard/ui/pagination";
import { Search } from "@/app/dashboard/ui/search";
import { SellersTable } from "@/app/dashboard/ui/seller/sellers-table";
import { getCurrentPage } from "@/lib/pagination";
import { fetchSellerProfiles } from "@/lib/seller-api";

export default async function SellersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const query = params.query ?? "";
  const { sellers, pagination } = await fetchSellerProfiles({
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
          Vendedores registrados
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Perfiles de vendedores disponibles en la Seller App.
        </p>
      </header>

      <Search placeholder="Buscar vendedores..." />

      <SellersTable sellers={sellers} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        query={query}
        basePath="/dashboard/vendedores"
      />
    </div>
  );
}
