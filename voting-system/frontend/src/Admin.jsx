import React from 'react'
import { useEffect,useState } from 'react'

function Admin() {
    const [count,setcount]=useState(0)
    useEffect(() => {
        async function fetchdata() {
            const res = await fetch("http://localhost:3001/votes")
            const data = await res.json();
            s
            console.log(data)
            if(res.ok){
                console.log("data fetched")
            }else{
                console.log("error")
            }
        }
        fetchdata()
    }, [])
  return (
    <div>
        Voter dashboard
        <h1>{count}</h1>
    </div>
  )
}

export default Admin