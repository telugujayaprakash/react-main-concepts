import React, { useState } from 'react'
import Navbar from './navbar'
import { Link } from 'react-router-dom'
import { signin } from '../Redux/Auth/AuthActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function signup () {
  const navigate = useNavigate()
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const dispatch = useDispatch()
  const user = useSelector(state => state.AuthReducer.IsLoggedIn)

  function handlesub (e) {
    e.preventDefault()
    dispatch(signin(name, email, password))
  }
  if (user) {
    navigate('/')
  }

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <div className='container d-flex justify-content-center align-items-center'>
        <form
          className='border p-5 rounded shadow'
          style={{ width: '400px' }}
          onSubmit={handlesub}
        >
          <h3 className='text-center mb-4'>Sign up</h3>

          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              onChange={e => {
                setname(e.target.value)
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              onChange={e => {
                setemail(e.target.value)
              }}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              onChange={e => {
                setpassword(e.target.value)
              }}
            />
          </div>
          <Link to={'/login'}>
            <p>Have an Account</p>
          </Link>
          <button type='submit' className='btn btn-primary w-100'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default signup
