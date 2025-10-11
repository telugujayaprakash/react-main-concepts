// import './App.css';
// import { io } from "socket.io-client";
// import { useState,useEffect } from 'react';


// function App() {
//   const[message,setMessage]=useState("");
//   useEffect(()=>{
//     const socket = io("http://localhost:3001");
//     socket.on('chat message', (msg) => {
//       setMessage(msg);
//     });
//   },[])
//   const socket = io("http://localhost:3001");
//   const send=()=>{
//     socket.emit('chat message',{message} );
//   }
//   return (
//     <>
//       <p>{message}</p>
//       <input placeholder='enter msg..' onChange={(e)=>{setMessage(e.target.value)}}/>
//       <button onClick={send}>send</button>
//     </>
//   );
// }

// export default App;
import './App.css';
import { io } from "socket.io-client";
import { useState, useEffect } from 'react';

const socket = io("http://localhost:3001"); // create socket once

function App() {
  const [message, setMessage] = useState("");       // input field
  const [chat, setChat] = useState([]);             // list of received messages

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat((prev) => [...prev, msg]); // append new messages
    });

    // cleanup on unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const send = () => {
    if (message.trim() !== "") {
      socket.emit('chat message', message); // send the input value
      setMessage(""); // clear input
    }
  };

  return (
    <>
      <div>
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        placeholder="enter msg.."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={send}>send</button>
    </>
  );
}

export default App;
