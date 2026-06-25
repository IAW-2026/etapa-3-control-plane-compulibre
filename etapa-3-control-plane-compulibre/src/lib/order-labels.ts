export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING_SHIPMENT: "Despacho Pendiente",
  LABEL_CREATED: "Despachado",
  IN_TRANSIT: "En camino",
  DELIVERED: "Entregado",
};

export function getOrderStatusLabel(status: string) {
  return ORDER_STATUS_LABELS[status] ?? status;
}
