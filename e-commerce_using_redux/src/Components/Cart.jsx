import React from 'react'
import Navbar from './navbar'
import { useSelector, useDispatch } from 'react-redux'
import { removeitem, clear_cart } from '../Redux/Products/ProductActions.js'

function CartPage () {
  const dispatch = useDispatch()
  const cartitems = useSelector(state => state.Productreducer.cart)
  const totalAmount = cartitems.reduce((total, item) => total + item.price, 0)
  console.log(cartitems)

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <button className='h1 border border-black border-2 m-20'>
        Your Cart
      </button>
      <button
        className='h1 border border-black border-2'
        onClick={() => {
          dispatch(clear_cart())
        }}
      >
        clear Cart
      </button>

      <div>
        {cartitems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartitems.map((item, index) => (
            <div>
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    marginRight: '20px'
                  }}
                />
                <div>
                  <h5 style={{ margin: '0 0 10px 0' }}>{item.title}</h5>
                  <p style={{ margin: 0 }}>${item.price}</p>
                </div>
                <button
                  className='btn btn-outline-primary btn-sm'
                  onClick={() => dispatch(removeitem(item.title))}
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </button>
              </div>
              <div
                style={{
                  marginTop: '20px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  borderTop: '2px solid black',
                  paddingTop: '10px'
                }}
              >
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CartPage
