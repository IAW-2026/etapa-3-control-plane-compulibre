export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  CPU: "CPU",
  GPU: "GPU",
  RAM: "RAM",
  STORAGE: "Almacenamiento",
  MOTHERBOARD: "Motherboard",
  PSU: "Fuente",
  CASE: "Gabinete",
  COOLER: "Cooler",
  MONITOR: "Monitor",
  PERIPHERAL: "Periferico",
  OTHER: "Otro",
};

export const PRODUCT_CONDITION_LABELS: Record<string, string> = {
  NEW: "Nuevo",
  USED: "Usado",
  REFURBISHED: "Reacondicionado",
};

export function getProductCategoryLabel(category: string) {
  return PRODUCT_CATEGORY_LABELS[category] ?? category;
}

export function getProductConditionLabel(condition: string) {
  return PRODUCT_CONDITION_LABELS[condition] ?? condition;
}
