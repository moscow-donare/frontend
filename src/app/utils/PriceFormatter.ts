export function PriceFormatter(price:number){
    const formatted = price.toLocaleString("es");
    return `USD ${formatted}`;
}