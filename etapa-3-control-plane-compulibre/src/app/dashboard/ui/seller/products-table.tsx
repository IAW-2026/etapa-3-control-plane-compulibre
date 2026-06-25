import type { SellerProduct } from "@/lib/seller-api";
import Link from "next/link";

import { DeleteProductButton } from "./delete-product-button";
import { EditProductButton } from "./edit-product-button";

function formatPrice(price: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export function ProductsTable({ products }: { products: SellerProduct[] }) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        {products.length > 0 ? (
          <table className="w-full min-w-full text-left text-sm md:min-w-180">
            <thead className="bg-secondary/70 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3 font-semibold md:px-5">Producto</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Seller
                </th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                  Marca
                </th>
                <th className="px-3 py-3 text-center font-semibold md:px-5 md:text-left">
                  Stock
                </th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">
                  Precio
                </th>
                <th className="w-24 px-3 py-3 md:w-28 md:px-5">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 py-4 font-medium text-gray-950 md:px-5">
                    <Link
                      href={`/dashboard/productos/${product.id}`}
                      className="transition hover:text-primary"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">
                    {product.sellerName}
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                    {product.brand}
                  </td>
                  <td className="px-3 py-4 text-center text-gray-600 md:px-5 md:text-left">
                    {product.stock}
                  </td>
                  <td className="hidden px-5 py-4 font-semibold text-primary md:table-cell">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-3 py-4 md:px-5">
                    <div className="flex justify-end gap-2">
                      <EditProductButton productId={product.id} />
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-8 text-sm text-gray-500">
            No hay productos para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}
