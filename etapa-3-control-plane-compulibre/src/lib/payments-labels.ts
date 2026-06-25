const WITHDRAWAL_STATUS_LABELS: Record<string, string> = {
  PROCESSING: "Procesando",
  COMPLETED: "Completado",
  REJECTED: "Rechazado",
};

const TICKET_STATUS_LABELS: Record<string, string> = {
  OPEN: "Abierto",
  CLOSED: "Cerrado",
};

export function getWithdrawalStatusLabel(status: string) {
  return WITHDRAWAL_STATUS_LABELS[status] ?? status;
}

export function getTicketStatusLabel(status: string) {
  return TICKET_STATUS_LABELS[status] ?? status;
}
