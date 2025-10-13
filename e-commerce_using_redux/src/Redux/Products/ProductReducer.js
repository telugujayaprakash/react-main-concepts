import { toast } from 'react-hot-toast'
const initialState = {
  cart: []
}
export const productreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add_to_cart': {
      toast.success('Added to cart')
      return { ...state, cart: [...state.cart, action.payload] }
    }
    case 'removeitem':
      const updatedCart = state.cart.filter(
        item => item.title !== action.payload
      )
      toast.success('Item removed')
      return { ...state, cart: updatedCart }
    case 'clear_cart':
      toast.success('Cart Cleared')
      return { ...state, cart: [] }
    default:
      return state
  }
}
