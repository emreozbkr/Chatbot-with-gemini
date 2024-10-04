import { useState } from 'react'
import './App.css'

function App() {

  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const backendUrl = 'http://localhost:8080/gemini'
  const sendChat = async () => {
    setLoading(true)

    try{
      const options = {
        method:'POST',
        body: JSON.stringify({
          history,
          prompt
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(backendUrl,options)
      const data = await response.json()
      setHistory(oldHistory => [...oldHistory, {
        role: 'user',
        parts: [{text:prompt}]
      },
      {
        role:'model',
        parts: [{text: data.text}]
      }
    
    ])
    setPrompt('')
    setLoading(false)

    }
    catch(err){

      console.log(err);

    }

  }

  return (
    <>
<div className='container'>
  <div className='chat-box'>
    {history.map((chat, index) => (
      <div className={`chat ${chat.role}`} key={index}>
        <h3>{chat.role === 'user' ? 'You' : 'Gemini'}</h3>
        <p>{chat.parts[0].text}</p>
      </div>
    ))}
  </div>

  <div className='input-container'>
    <input 
      value={prompt} 
      onChange={(e) => setPrompt(e.target.value)} 
      className='form-control' 
      type='text' 
      placeholder='Type your message...' 
    />
    <button 
      disabled={loading} 
      onClick={sendChat} 
      className='btn'>
        {loading ? 'Loading...' : 'Send'}
    </button>
  </div>
</div>
    </>
  )
}

export default App
