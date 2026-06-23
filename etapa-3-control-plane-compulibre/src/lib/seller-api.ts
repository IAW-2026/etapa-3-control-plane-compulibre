type SellerApiPagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalProducts?: number;
  totalOrders?: number;
  totalSellers?: number;
};

export type SellerProduct = {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  name: string;
  description: string | null;
  category: string;
  price: string;
  brand: string;
  stock: number;
  condition: string;
  image: string | null;
  images: {
    id: string;
    imageUrl: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type UpdateSellerProductInput = {
  name: string;
  description: string | null;
  category: string;
  price: number;
  brand: string;
  stock: number;
  condition: string;
  imageUrls?: string[];
};

type SellerProductsResponse = {
  products: SellerProduct[];
  pagination: SellerApiPagination;
};

export type SellerProfile = {
  id: string;
  storeName: string;
  contactEmail: string;
  sellerAddress: string | null;
  postalCode: string | null;
  onboardingCompleted: boolean;
  productsCount?: number;
  ordersCount?: number;
  createdAt: string;
  updatedAt: string;
};

type SellerProfilesResponse = {
  sellers: SellerProfile[];
  pagination: SellerApiPagination;
};

export type SellerOrder = {
  id: string;
  orderNumber: number;
  orderName: string;
  externalBuyerOrderId: string;
  buyerId: string | null;
  buyerName: string;
  buyerAddress: string | null;
  buyerPostalCode: string | null;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  originAddress: string | null;
  originPostalCode: string | null;
  trackingId: string | null;
  transactionId: string | null;
  status: string;
  itemsCount: number;
  total: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    brand: string;
    category: string;
    quantity: number;
    price: string;
    image: string | null;
  }[];
  createdAt: string;
  updatedAt: string;
};

type SellerOrdersResponse = {
  orders: SellerOrder[];
  pagination: SellerApiPagination;
};

function getSellerApiBaseUrl() {
  const baseUrl = process.env.SELLER_APP_URL;

  if (!baseUrl) {
    throw new Error("SELLER_APP_URL no esta configurada");
  }

  return baseUrl.replace(/\/$/, "");
}

function getSellerApiKey() {
  const apiKey = process.env.SUPERADMIN_API_KEY;

  if (!apiKey) {
    throw new Error("SUPERADMIN_API_KEY no esta configurada");
  }

  return apiKey;
}

async function fetchSellerApi<T>(path: string) {
  const url = `${getSellerApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": getSellerApiKey(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Seller App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchSellerProducts({
  query,
  page,
  limit = 12,
}: {
  query: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (query) {
    params.set("query", query);
  }

  const data = await fetchSellerApi<SellerProductsResponse>(
    `/api/admin/products?${params.toString()}`
  );

  return {
    products: data.products,
    pagination: {
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalPages: data.pagination.totalPages,
      totalItems: data.pagination.totalProducts ?? 0,
    },
  };
}

export async function fetchSellerOrders({
  query,
  page,
  limit = 12,
}: {
  query: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (query) {
    params.set("query", query);
  }

  const data = await fetchSellerApi<SellerOrdersResponse>(
    `/api/admin/orders?${params.toString()}`
  );

  return {
    orders: data.orders,
    pagination: {
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalPages: data.pagination.totalPages,
      totalItems: data.pagination.totalOrders ?? 0,
    },
  };
}

export async function fetchSellerOrderById(orderId: string) {
  return fetchSellerApi<SellerOrder>(`/api/admin/orders/${orderId}`);
}

export async function fetchSellerProductById(productId: string) {
  return fetchSellerApi<SellerProduct>(`/api/admin/products/${productId}`);
}

export async function fetchSellerProfiles({
  query,
  page,
  limit = 12,
}: {
  query: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (query) {
    params.set("query", query);
  }

  const data = await fetchSellerApi<SellerProfilesResponse>(
    `/api/admin/sellers?${params.toString()}`
  );

  return {
    sellers: data.sellers,
    pagination: {
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalPages: data.pagination.totalPages,
      totalItems: data.pagination.totalSellers ?? 0,
    },
  };
}

export async function fetchSellerProfileById(sellerId: string) {
  return fetchSellerApi<SellerProfile>(`/api/admin/sellers/${sellerId}`);
}

export async function updateSellerProduct(
  productId: string,
  input: UpdateSellerProductInput
) {
  const response = await fetch(
    `${getSellerApiBaseUrl()}/api/admin/products/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": getSellerApiKey(),
      },
      body: JSON.stringify(input),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Seller App respondio ${response.status} al editar producto: ${errorText}`
    );
  }

  return response.json() as Promise<SellerProduct>;
}

export async function deleteSellerProduct(productId: string) {
  const response = await fetch(
    `${getSellerApiBaseUrl()}/api/admin/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": getSellerApiKey(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Seller App respondio ${response.status} al eliminar producto: ${errorText}`
    );
  }

  return response.json() as Promise<SellerProduct>;
}
