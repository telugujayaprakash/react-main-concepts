import { toast } from 'react-hot-toast'
const initialState = {
  users: [],
  profile: {},
  IsLoggedIn: false
}

export const AuthReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'Signin': {
      const isuser = state.users.find(u => u.email === action.payload.email)
      if (isuser) {
        toast.error('Email already Present')
        return state
      } else {
        toast.success('Account Created')
        return {
          ...state,
          users: [...state.users, action.payload],
          profile: action.payload,
          IsLoggedIn: true
        }
      }
    }
    case 'login': {
      const isuser = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      )
      if (isuser) {
        toast.success('Login Success')
        return { ...state, profile: action.payload, IsLoggedIn: true }
      } else {
        toast.error('Invalid Credentials')
        return state
      }
    }
    case 'logout': {
      toast.success('Logout Successfull')
      return { ...state, profile: {}, IsLoggedIn: false }
    }
    default: {
      return state
    }
  }
}
