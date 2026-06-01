/** URL publique du menu scan (commande à table). */
export function getTableMenuScanPath(tableNumber: string) {
  const n = tableNumber.trim();
  return `/menu/scan/${encodeURIComponent(n)}`;
}

export function getTableMenuScanUrl(tableNumber: string, origin = typeof window !== "undefined" ? window.location.origin : "") {
  return `${origin}${getTableMenuScanPath(tableNumber)}`;
}
