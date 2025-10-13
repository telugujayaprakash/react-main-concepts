import React, { useState } from "react"

function App() {
  const [title, settitle] = useState("sq")
  const [disc, setdisc] = useState("b2")
  const [Ep, setep] = useState([])

  async function upload(e) {
    e.preventDefault();
    console.log(title)
    console.log(disc)
    const data = await fetch('http://localhost:8000/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        disc,
        Ep
      })
    })
    const res = await data.json()
    console.log(res)
  }
  window.addEventListener('load', async () => {
    try {
      const sw = await navigator.serviceWorker.register('/sw.js'); // absolute path
      console.log('Service Worker registered:', sw);
    } catch (err) {
      console.error('SW registration failed:', err);
    }
  });

  async function subscribe() {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BBLxRSVoq-NyLXS94JCSReP_EtY2kzyUg1-z9Y7AHKqIPmNJUGF8cmmUwbtkEqvV3AMLBhCy3mKtemM5NcWPeqg',
    });
    setep(push)
    console.log(JSON.stringify(push));
  }

  return (
    <>
      <div >
        <form action="">
          <input type="text" placeholder="Movie title" onChange={(e) => settitle(e.target.value)} required />
          <input type="text" placeholder="Movie discription" onChange={(e) => setdisc(e.target.value)} required />
          <button type="submit" onClick={upload}>submit</button>
        </form>
        <button onClick={subscribe}>subscribe</button>
      </div>
    </>
  )
}

export default App
