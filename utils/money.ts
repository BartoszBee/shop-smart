export function formatPLN(grosze: number): string {
    return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2
    }).format(grosze / 100);
}