export function money(value: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0
  }).format(value);
}

export function productImages(value: string) {
  try {
    return JSON.parse(value) as string[];
  } catch {
    return [value];
  }
}

export function productSizes(value: string) {
  try {
    return JSON.parse(value) as string[];
  } catch {
    return value.split(",").map((x) => x.trim()).filter(Boolean);
  }
}

export function productColors(value: string) {
  try {
    return JSON.parse(value) as string[];
  } catch {
    return value.split(",").map((x) => x.trim()).filter(Boolean);
  }
}
