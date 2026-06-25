const SHIPMENT_STATUS_LABELS: Record<string, string> = {
  LABEL_CREATED: "Despachado",
  IN_TRANSIT: "En camino",
  DELIVERED: "Entregado",
};

export function getShipmentStatusLabel(status: string) {
  return SHIPMENT_STATUS_LABELS[status] ?? status;
}

