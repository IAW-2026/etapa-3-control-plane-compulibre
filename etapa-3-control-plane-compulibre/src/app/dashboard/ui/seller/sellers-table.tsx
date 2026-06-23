import Link from "next/link";

import type { SellerProfile } from "@/lib/seller-api";

export function SellersTable({ sellers }: { sellers: SellerProfile[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {sellers.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm md:min-w-180">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">ID</th>
                <th className="px-3 py-3 font-semibold md:px-5">
                  Store name
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Contact email
                </th>
                <th className="px-3 py-3 font-semibold md:px-5">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {sellers.map((seller) => (
                <tr key={seller.id}>
                  <td className="max-w-32 px-3 py-4 font-medium text-gray-950 md:max-w-none md:px-5">
                    <Link
                      href={`/dashboard/vendedores/${seller.id}`}
                      className="block truncate transition hover:text-primary"
                    >
                      {seller.id}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-gray-600 md:px-5">
                    {seller.storeName}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                    {seller.contactEmail}
                  </td>
                  <td className="px-3 py-4 text-gray-600 md:px-5">
                    {seller.sellerAddress ?? "Sin direccion"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay vendedores para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
