import Link from "next/link";

import type { SellerProduct } from "@/lib/seller-api";
import {
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CONDITION_LABELS,
} from "@/lib/product-labels";

import { FormSubmitButton } from "../form-submit-button";

const categories = Object.keys(PRODUCT_CATEGORY_LABELS);
const conditions = Object.keys(PRODUCT_CONDITION_LABELS);

export function ProductForm({
  action,
  product,
}: {
  action: (formData: FormData) => Promise<void>;
  product: SellerProduct;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">
          Informacion principal
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Nombre
            <input
              required
              name="name"
              type="text"
              defaultValue={product.name}
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Marca
            <input
              required
              name="brand"
              type="text"
              defaultValue={product.brand}
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Categoria
            <select
              required
              name="category"
              defaultValue={product.category}
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {PRODUCT_CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Condicion
            <select
              required
              name="condition"
              defaultValue={product.condition}
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {PRODUCT_CONDITION_LABELS[condition]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-gray-700">
          Descripcion
          <textarea
            name="description"
            rows={4}
            defaultValue={product.description ?? ""}
            className="resize-y rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
      </section>

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Venta y stock</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Precio
            <input
              required
              name="price"
              type="text"
              inputMode="decimal"
              defaultValue={product.price}
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Stock
            <input
              required
              name="stock"
              type="number"
              min="0"
              step="1"
              defaultValue={product.stock}
              className="rounded-lg border border-primary/20 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>

        {product.images.length > 0 ? (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">
              Imagenes actuales
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {product.images.map((image) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={product.name}
                  className="aspect-video w-full rounded-lg border border-primary/10 object-cover"
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Las imagenes se administran desde la Seller App.
            </p>
          </div>
        ) : null}
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href={`/dashboard/productos/${product.id}`}
          className="rounded-lg border border-primary/20 bg-white px-4 py-2 text-center text-sm font-semibold text-primary shadow-sm transition hover:bg-secondary"
        >
          Cancelar
        </Link>
        <FormSubmitButton label="Guardar cambios" />
      </div>
    </form>
  );
}
