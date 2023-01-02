import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import FirebaseComponent from './firebaseComponent';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <FirebaseComponent />
    </div>
  )
}

export default App
