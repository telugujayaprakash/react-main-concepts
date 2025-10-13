export const addtocart = items => {
  return { type: 'add_to_cart', payload: items }
}
export const removeitem = title => {
  return { type: 'removeitem', payload: title }
}
export const clear_cart = () => {
  return { type: 'clear_cart' }
}
