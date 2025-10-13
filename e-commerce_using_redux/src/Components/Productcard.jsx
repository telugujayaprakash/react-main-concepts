import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './navbar'
import { Link } from 'react-router-dom'

function ProductCard () {
  const { id } = useParams()
  const [productDetails, setProductDetails] = useState(null)

  useEffect(() => {
    async function fetchProductDetails () {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await res.json()
      setProductDetails(data)
    }

    fetchProductDetails()
  }, [id])

  if (!productDetails) return <div>Loading...</div>

  return (
    <div>
      <Navbar />
      <div
        className='card shadow-sm border-0'
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.03)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <img
          src={productDetails.image}
          className='card-img-top p-3'
          alt={productDetails.title}
          style={{
            height: '220px',
            objectFit: 'contain',
            backgroundColor: 'white'
          }}
        />
        <div className='card-body text-center'>
          <h6 className='card-title text-truncate'>{productDetails.title}</h6>
          <p className='card-text fw-bold text-success mb-2'>
            ${productDetails.price}
          </p>
          <Link to={'/'} className='btn btn-outline-primary btn-sm'>
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
