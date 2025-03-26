import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListMangas from './components/ListMangas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListMangas />
    </>
  )
}

export default App
