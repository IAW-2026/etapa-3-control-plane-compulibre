import { SHIPPING_APP_URL } from "./shipping";

type ShipmentsApiPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ShipmentStatus = "LABEL_CREATED" | "IN_TRANSIT" | "DELIVERED";

export type Shipment = {
  trackingId: string;
  externalTrackingId: string | null;
  externalSellerOrderId: string;
  externalSellerId: string | null;
  externalBuyerOrderId: string;
  courier: string;
  originAddress: string | null;
  destinationAddress: string | null;
  status: ShipmentStatus | string;
  labelUrl: string | null;
  createdAt: string;
  updatedAt: string;
  events?: {
    id: number;
    trackingId: string;
    statusUpdate: string;
    location: string | null;
    timestamp: string;
  }[];
};

export type CreateShipmentInput = {
  sellerOrderId: string;
  buyerOrderId: string;
  sellerId: string;
  externalTrackingId: string;
  buyerAddress: string;
  originAddress: string;
  courier: string;
};

type ShipmentsResponse = {
  shipments: Shipment[];
  pagination: ShipmentsApiPagination;
  counts?: Record<string, number>;
};

function getSuperadminApiKey() {
  const apiKey = process.env.SUPERADMIN_API_KEY;

  if (!apiKey) {
    throw new Error("SUPERADMIN_API_KEY no esta configurada");
  }

  return apiKey;
}

async function fetchShippingApi<T>(path: string) {
  const url = `${SHIPPING_APP_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": getSuperadminApiKey(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Shipping App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

async function postShippingApi<T>(path: string, body: unknown) {
  const url = `${SHIPPING_APP_URL}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": getSuperadminApiKey(),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Shipping App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchShipments({
  query,
  status,
  page,
}: {
  query: string;
  status: string;
  page: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (query) {
    params.set("q", query);
  }

  if (status) {
    params.set("status", status);
  }

  const data = await fetchShippingApi<ShipmentsResponse>(
    `/api/shipments?${params.toString()}`
  );

  return {
    shipments: data.shipments,
    counts: data.counts ?? {},
    pagination: {
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalPages: data.pagination.totalPages,
      totalItems: data.pagination.total,
    },
  };
}

export async function fetchShipmentByTrackingId(trackingId: string) {
  return fetchShippingApi<Shipment>(
    `/api/shipments/${encodeURIComponent(trackingId)}`
  );
}

export async function createShipment(input: CreateShipmentInput) {
  return postShippingApi<Shipment>("/api/shipments", input);
}
