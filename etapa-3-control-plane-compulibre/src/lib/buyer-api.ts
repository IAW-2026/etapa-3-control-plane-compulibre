type BuyerApiMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

type BuyerApiListResponse<T> = {
  success: boolean;
  data: T[];
  meta: BuyerApiMeta;
};

type BuyerApiDetailResponse<T> = {
  success: boolean;
  data: T;
};

export type BuyerProfile = {
  id: string;
  fullName: string;
  defaultShippingAddress: string | null;
  defaultPostalCode: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BuyerOrder = {
  id: string;
  buyerId: string;
  buyer: {
    id: string;
    fullName: string;
  } | null;
  status: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
};

export type BuyerOrderDetail = BuyerOrder & {
  items: {
    id: string;
    productName: string;
    quantity: number;
    cachedPrice: string;
  }[];
};

function getBuyerApiBaseUrl() {
  const baseUrl = process.env.BUYER_APP_URL;

  if (!baseUrl) {
    throw new Error("BUYER_APP_URL no esta configurada");
  }

  return baseUrl.replace(/\/$/, "");
}

function getSuperadminApiKey() {
  const apiKey = process.env.SUPERADMIN_API_KEY;

  if (!apiKey) {
    throw new Error("SUPERADMIN_API_KEY no esta configurada");
  }

  return apiKey;
}

async function fetchBuyerApi<T>(path: string) {
  const url = `${getBuyerApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": getSuperadminApiKey(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Buyer App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

async function postBuyerApi<T>(path: string) {
  const url = `${getBuyerApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": getSuperadminApiKey(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Buyer App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

function normalizePagination(meta: BuyerApiMeta) {
  return {
    page: meta.currentPage,
    limit: meta.itemsPerPage,
    totalPages: meta.totalPages,
    totalItems: meta.totalItems,
  };
}

export async function fetchBuyerProfiles({
  search,
  page,
  limit = 12,
}: {
  search: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.set("search", search);
  }

  const response = await fetchBuyerApi<BuyerApiListResponse<BuyerProfile>>(
    `/api/system/buyers?${params.toString()}`
  );

  return {
    buyers: response.data,
    pagination: normalizePagination(response.meta),
  };
}

export async function fetchBuyerOrders({
  search,
  page,
  limit = 12,
}: {
  search: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.set("search", search);
  }

  const response = await fetchBuyerApi<BuyerApiListResponse<BuyerOrder>>(
    `/api/system/orders?${params.toString()}`
  );

  return {
    orders: response.data,
    pagination: normalizePagination(response.meta),
  };
}

export async function fetchBuyerOrderById(orderId: string) {
  const response = await fetchBuyerApi<BuyerApiDetailResponse<BuyerOrderDetail>>(
    `/api/system/orders/${orderId}`
  );

  return response.data;
}

export async function fetchBuyerProfileById(buyerId: string) {
  const response = await fetchBuyerApi<BuyerApiDetailResponse<BuyerProfile>>(
    `/api/system/buyers/${buyerId}`
  );

  return response.data;
}

export async function toggleBuyerStatus(buyerId: string) {
  return postBuyerApi<BuyerApiDetailResponse<BuyerProfile>>(
    `/api/system/buyers/${buyerId}/toggle-status`
  );
}

export async function resetBuyerForm(buyerId: string) {
  return postBuyerApi<{ success: boolean; message: string }>(
    `/api/system/buyers/${buyerId}/reset-form`
  );
}

export async function resetBuyerOrders(buyerId: string) {
  return postBuyerApi<{ success: boolean; message: string }>(
    `/api/system/buyers/${buyerId}/reset-orders`
  );
}

export async function resetBuyerAll(buyerId: string) {
  return postBuyerApi<{ success: boolean; message: string }>(
    `/api/system/buyers/${buyerId}/reset-all`
  );
}
