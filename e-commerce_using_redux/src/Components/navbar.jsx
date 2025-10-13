import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Redux/Auth/AuthActions'

function navbar () {
  const dispatch = useDispatch()
  const userdata = useSelector(state => state.AuthReducer.IsLoggedIn)
  return (
    <div>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          <h1 className='navbar-brand'>
            <Link to={'/'}>E-Commerce</Link>
          </h1>
          <div className='d-flex gap-4' role='search'>
            <Link to={'/login'}>
              <button className='btn btn-outline-success'>
                {userdata ? (
                  <p onClick={() => dispatch(logout())}>Logout</p>
                ) : (
                  <p>Login</p>
                )}
              </button>
            </Link>
            <Link to={'/cart'}>
              <button className='btn btn-outline-success' type='submit'>
                Cart
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default navbar
