type PaymentsApiPagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalWithdrawals?: number;
  totalTickets?: number;
};

export type WithdrawalStatus = "PROCESSING" | "COMPLETED" | "REJECTED";
export type TicketStatus = "OPEN" | "CLOSED";

export type Withdrawal = {
  id: string;
  account_id: string;
  amount: number;
  destination_cbu: string;
  status: WithdrawalStatus | string;
};

export type Ticket = {
  id: string;
  buyerId: string;
  transactionId: string;
  subject: string;
  message: string;
  status: TicketStatus | string;
  createdAt: string;
};

type WithdrawalsResponse = {
  withdrawals: Withdrawal[];
  pagination: PaymentsApiPagination;
};

type TicketsResponse = {
  tickets: Ticket[];
  pagination: PaymentsApiPagination;
};

function getPaymentsApiBaseUrl() {
  const baseUrl = process.env.PAYMENTS_APP_URL;

  if (!baseUrl) {
    throw new Error("PAYMENTS_APP_URL no esta configurada");
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

async function fetchPaymentsApi<T>(path: string) {
  const url = `${getPaymentsApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    headers: {
      "x-api-key": getSuperadminApiKey(),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Payments App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

async function mutatePaymentsApi<T>(path: string, body: unknown) {
  const url = `${getPaymentsApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    method: "PATCH",
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
      `Payments App respondio ${response.status} en ${url}: ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchWithdrawals({
  status,
  page,
  limit = 12,
}: {
  status: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (status) {
    params.set("status", status);
  }

  const data = await fetchPaymentsApi<WithdrawalsResponse>(
    `/api/control-panel/retiros?${params.toString()}`
  );

  return {
    withdrawals: data.withdrawals,
    pagination: {
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalPages: data.pagination.totalPages,
      totalItems: data.pagination.totalWithdrawals ?? 0,
    },
  };
}

export async function fetchTickets({
  status,
  page,
  limit = 12,
}: {
  status: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (status) {
    params.set("status", status);
  }

  const data = await fetchPaymentsApi<TicketsResponse>(
    `/api/control-panel/tickets?${params.toString()}`
  );

  return {
    tickets: data.tickets,
    pagination: {
      page: data.pagination.page,
      limit: data.pagination.limit,
      totalPages: data.pagination.totalPages,
      totalItems: data.pagination.totalTickets ?? 0,
    },
  };
}

export async function resolveWithdrawal({
  payoutId,
  action,
}: {
  payoutId: string;
  action: "COMPLETED" | "REJECTED";
}) {
  return mutatePaymentsApi("/api/control-panel/retiros", {
    payoutId,
    action,
  });
}

export async function closeTicket(ticketId: string) {
  return mutatePaymentsApi("/api/control-panel/tickets", {
    ticketId,
    action: "CLOSED",
  });
}
