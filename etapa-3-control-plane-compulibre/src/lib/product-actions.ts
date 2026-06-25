"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteSellerProduct, updateSellerProduct } from "./seller-api";

function readRequiredString(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`El campo ${field} es obligatorio`);
  }

  return value.trim();
}

function readOptionalString(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  return value.trim();
}

function readRequiredNumber(formData: FormData, field: string) {
  const value = Number(readRequiredString(formData, field));

  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`El campo ${field} debe ser un numero valido`);
  }

  return value;
}

function readRequiredInteger(formData: FormData, field: string) {
  const value = readRequiredNumber(formData, field);

  if (!Number.isInteger(value)) {
    throw new Error(`El campo ${field} debe ser un numero entero`);
  }

  return value;
}

export async function updateProductFromForm(
  productId: string,
  formData: FormData
) {
  await updateSellerProduct(productId, {
    name: readRequiredString(formData, "name"),
    description: readOptionalString(formData, "description"),
    category: readRequiredString(formData, "category"),
    price: readRequiredNumber(formData, "price"),
    brand: readRequiredString(formData, "brand"),
    stock: readRequiredInteger(formData, "stock"),
    condition: readRequiredString(formData, "condition"),
  });

  revalidatePath("/dashboard/productos");
  revalidatePath(`/dashboard/productos/${productId}`);
  redirect(`/dashboard/productos/${productId}`);
}

export async function deleteProductFromForm(
  productId: string,
  redirectPath = "/dashboard/productos"
) {
  await deleteSellerProduct(productId);

  revalidatePath("/dashboard/productos");
  redirect(redirectPath);
}
