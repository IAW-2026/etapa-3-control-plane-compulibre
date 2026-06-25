import { notFound } from "next/navigation";

import { ProductForm } from "@/app/dashboard/ui/seller/product-form";
import { updateProductFromForm } from "@/lib/product-actions";
import { fetchSellerProductById } from "@/lib/seller-api";

export default async function EditProductPage({
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

  const updateProductWithId = updateProductFromForm.bind(null, product.id);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
          Seller
        </p>
        <h1 className="mt-2 text-3xl font-bold text-primary">
          Editar producto
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Actualiza los datos del producto en la Seller App desde el Control
          Plane.
        </p>
      </header>

      <ProductForm action={updateProductWithId} product={product} />
    </div>
  );
}
