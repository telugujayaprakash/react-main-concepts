import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { Link } from 'react-router-dom'
import { login } from '../Redux/Auth/AuthActions'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

function Login () {
  const navigate = useNavigate()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const dispatch = useDispatch()
  const userdata = useSelector(state => state.AuthReducer.IsLoggedIn)
  function handlesub (e) {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    if (userdata) {
      navigate('/')
    }
  }, [userdata])

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <div className='container d-flex justify-content-center align-items-center'>
        <form
          className='border p-5 rounded shadow'
          style={{ width: '400px' }}
          onSubmit={handlesub}
        >
          <h3 className='text-center mb-4'>Login</h3>

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
          <Link to={'/signup'}>
            <p>Don't have Account</p>
          </Link>
          <button type='submit' className='btn btn-primary w-100'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
