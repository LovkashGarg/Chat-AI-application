import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [question,setquestion]=useState('');
  const [answer, setanswer] = useState('');
  async function GenerateAnswer() {
    // console.log(API_URL);
    try {
      setanswer("Loading ...");
      console.log(question);
      const res = await axios.post(`https://chat-ai-app-backend.onrender.com/api/generate`, {
        "contents": [
          {
            "parts": [{ "text": question }]
          }
        ]
      });
      console.log(res);
      // console.log("API Response:", res.data); // Log response to verify structure
      setanswer(res.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setanswer("An error occurred. Please try again.");
      console.error("Error fetching the answer:", error.response ? error.response.data : error.message);
    }
  }
  
  return (
    <>
      <div>
      <h1>Chat AI Application </h1>
      <textarea  value={question} id='inputbox' placeholder='Enter Your Questions Here ....' onChange={(e)=> setquestion(e.target.value)} ></textarea>
      <div></div>
      <button onClick={GenerateAnswer}>Generate Answer</button>
     <p id='answerbox'>{answer}</p>
     </div>
    </>
  )
}

export default App
