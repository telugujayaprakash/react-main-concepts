import axios from "axios";
import { useState } from "react";

function UploadMovies() {
    const [file, setFile] = useState(null);
    const [language, setLanguage] = useState("Tamil");
    const [segment, setSegment] = useState("Movies");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("language", language);
        formData.append("segment", segment);

        try {
            const res = await axios.post("http://localhost:3001/uploadMovies", formData);
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert("Error uploading file");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => setLanguage(e.target.value)}>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Hindi</option>
                <option>Malayalam</option>
                <option>Bengali</option>
            </select>

            <select onChange={(e) => setSegment(e.target.value)}>
                <option>Movies</option>
                <option>Series</option>
                <option>News</option>
            </select>

            <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadMovies;
