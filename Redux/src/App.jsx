import { useState } from 'react'
import { increment, decrement, reset } from './redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

function App() {
  const [Like, setLike] = useState(0)
  const value = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className='box'>
        <h1>UseState</h1>
        <button className='value'>{Like}</button> <br />
        <button onClick={() => setLike(Like + 1)} className='value'>Increment +1</button>
        <h1>Redux</h1>
        <button className='value'>{value}</button> <br />
        <button onClick={() => dispatch(increment())} className='value'>Increment +1</button>
        <button onClick={() => dispatch(decrement())} className='value'>Decrement -1</button>
        <button onClick={() => dispatch(reset())} className='value'>reset</button>
      </div>
    </>
  )
}

export default App