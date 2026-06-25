import { Pagination } from "@/app/dashboard/ui/pagination";
import { Search } from "@/app/dashboard/ui/search";
import { ProductsTable } from "@/app/dashboard/ui/seller/products-table";
import { getCurrentPage } from "@/lib/pagination";
import { fetchSellerProducts } from "@/lib/seller-api";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const query = params.query ?? "";
  const { products, pagination } = await fetchSellerProducts({
    query,
    page: currentPage,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
            Seller
          </p>
          <h1 className="mt-2 text-3xl font-bold text-primary">
            Productos publicados
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Catalogo global de productos cargados por vendedores.
          </p>
        </div>
      </header>

      <Search placeholder="Buscar productos..." />

      <ProductsTable products={products} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        query={query}
        basePath="/dashboard/productos"
      />
    </div>
  );
}
