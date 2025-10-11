import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Admin from './Admin'
function App() {
  const [movie, setmovie] = useState()
  const [Data, setData] = useState()
  const [person, setperson] = useState()
  const [category, setcategory] = useState()
  const [vote, setvote] = useState(false)
  const [didvote,setdidvote]=useState(false)

  async function fetchdata(e) {
    e.preventDefault()
    const res = await fetch(`http://localhost:3000/${movie}`)
    const data = await res.json();
    setData(data)
  }
  async function submit() {
    const res=await fetch("http://localhost:3001/votes",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ person: person, category: category })
    })
    console.log("person :", person)
    console.log("Category :", category)
    if(res.ok){
      setvote(true)
      setdidvote(true)
    }else{
      console.log("error")
    }
  }

  return (
    <>
      <div>
        <h1>voting system</h1>
        <input type="text" placeholder='Enter movie number' onChange={(e) => (setmovie(e.target.value))} />
        <button onClick={fetchdata}>get Movie</button>
      </div>
      {
        Data ? <div>
          <h1>Movie Name : {Data.names}</h1>
          <h1>Movie released year :{Data.date_x}</h1>
          <h1>Movie original language :{Data.orig_lang}</h1>
          {
            didvote? <h1></h1> : 
            <div className='voter-card' id='voter-card'>
            <select name="" id="" onChange={(e) => (setperson(e.target.value))}>{Data?.crew?.split(",").map((person, index) => (
              <option key={index}>{person.trim()}</option>
            ))}</select>
            <select name="" id="" onChange={(e) => (setcategory(e.target.value))}>
              <option value="Best_Director">Best Director</option>
              <option value="Best Male Actor">Best Male Actor</option>
              <option value="Best female Actor">Best female Actor</option>
              <option value="Best Side Character">Best Side Character</option>
            </select>
          </div>
          }

        </div> : <h1></h1>
      }
      {didvote? <span></span>:<button onClick={submit}>submit vote</button>}
      {
        vote ? <div>
          <h1>Thanks for voting </h1>
          <h1> Voted for "{person}"</h1>
          <h1>Under "{category}"" category </h1>
        </div> : <h1></h1>
       }
       <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
