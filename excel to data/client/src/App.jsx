import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [Data, setData] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("datafile", file); // "datafile" should match with backend field name

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Server response:", data);
      setData(data.data);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
    e.target.reset();
    setFile(null);
  }

  return (
    <div>
      <h1>Upload Excel Sheet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      <h2>here the data</h2>
    </div>
  );
}

export default App;