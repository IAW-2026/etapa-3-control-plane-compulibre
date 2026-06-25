import { BuyersTable } from "@/app/dashboard/ui/buyer/buyers-table";
import { Pagination } from "@/app/dashboard/ui/pagination";
import { Search } from "@/app/dashboard/ui/search";
import { fetchBuyerProfiles } from "@/lib/buyer-api";
import { getCurrentPage } from "@/lib/pagination";

export default async function BuyersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = getCurrentPage(params.page);
  const search = params.search ?? "";
  const { buyers, pagination } = await fetchBuyerProfiles({
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
          Compradores registrados
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Perfiles de compradores disponibles en la Buyer App.
        </p>
      </header>

      <Search
        placeholder="Buscar compradores..."
        queryParam="search"
        inputId="buyers-search"
      />

      <BuyersTable buyers={buyers} />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        basePath="/dashboard/compradores"
        extraParams={{ search }}
      />
    </div>
  );
}
