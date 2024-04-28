export const formatPrice = (price: string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}