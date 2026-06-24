const BUYER_ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagada",
  CANCELLED: "Cancelada",
  REJECTED: "Rechazada",
};

export function getBuyerOrderStatusLabel(status: string) {
  return BUYER_ORDER_STATUS_LABELS[status] ?? status;
}

export function getBuyerStatusLabel(isActive: boolean) {
  return isActive ? "Activo" : "Suspendido";
}
