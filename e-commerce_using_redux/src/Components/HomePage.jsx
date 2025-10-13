import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addtocart } from '../Redux/Products/ProductActions.js'
function HomePage () {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchproducts () {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      console.log(data)
      setProducts(data)
    }
    fetchproducts()
  }, [])

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />

      <div className='container py-4'>
        <h1 className='text-center mb-4'>🛍️ Our Products</h1>

        {products.length === 0 ? (
          <div className='text-center mt-5'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='mt-3'>Loading products...</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {products.map((item, index) => (
              <div
                className='card shadow-sm border-0'
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                key={index}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.03)'
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <img
                  src={item.image}
                  className='card-img-top p-3'
                  alt={item.title}
                  style={{
                    height: '220px',
                    objectFit: 'contain',
                    backgroundColor: 'white'
                  }}
                />
                <div className='card-body text-center'>
                  <h6 className='card-title text-truncate'>{item.title}</h6>
                  <p className='card-text fw-bold text-success mb-2'>
                    ${item.price}
                  </p>
                  <Link
                    to={`/product/${item.id}`}
                    className='btn btn-outline-primary btn-sm'
                  >
                    View
                  </Link>
                  <button
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => dispatch(addtocart(item))}
                    style={{ marginLeft: '10px' }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
