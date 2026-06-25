import { notFound } from "next/navigation";

import { DeleteProductButton } from "@/app/dashboard/ui/seller/delete-product-button";
import { EditProductButtonWithLabel } from "@/app/dashboard/ui/seller/edit-product-button";
import {
  getProductCategoryLabel,
  getProductConditionLabel,
} from "@/lib/product-labels";
import { fetchSellerProductById } from "@/lib/seller-api";

function formatPrice(price: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-AR");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product;

  try {
    product = await fetchSellerProductById(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Producto
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          {product.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Ultima actualizacion: {formatDate(product.updatedAt)}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">
            Datos principales
          </h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Seller</dt>
              <dd className="text-right font-medium text-gray-950">
                {product.sellerName}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Marca</dt>
              <dd className="font-medium text-gray-950">{product.brand}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Categoria</dt>
              <dd className="font-medium text-gray-950">
                {getProductCategoryLabel(product.category)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Condicion</dt>
              <dd className="font-medium text-gray-950">
                {getProductConditionLabel(product.condition)}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Venta</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Precio</dt>
              <dd className="font-semibold text-primary">
                {formatPrice(product.price)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Stock</dt>
              <dd className="font-medium text-gray-950">{product.stock}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Email seller</dt>
              <dd className="text-right font-medium text-gray-950">
                {product.sellerEmail}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      {product.images.length > 0 ? (
        <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Imagenes</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {product.images.map((image) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt={product.name}
                className="aspect-video w-full rounded-lg border border-primary/10 object-cover"
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">Descripcion</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {product.description || "Este producto todavia no tiene descripcion."}
        </p>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <EditProductButtonWithLabel productId={product.id} />
        <DeleteProductButton
          productId={product.id}
          productName={product.name}
          showLabel
        />
      </div>
    </div>
  );
}
