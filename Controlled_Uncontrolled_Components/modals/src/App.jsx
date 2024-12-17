import UncontrolledModal from "./components/UncontrolledModal"
import ControlledModal from "./components/ControlledModal"
import { useState } from "react"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <UncontrolledModal>
        <h1>Uncontrolled Modal</h1>
        <p>This is an uncontrolled modal</p>
      </UncontrolledModal>

      <ControlledModal 
        isOpen={isOpen} 
        onRequestClose={()=> {
          setIsOpen(false)
        }} 
      >
        <h1>Controlled Modal</h1>
        <p>This is a controlled modal</p>
      </ControlledModal>
      <button 
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? "Hide Controlled Modal":"Show Controlled Modal"}
      </button>
    </>
  )
}

export default App
