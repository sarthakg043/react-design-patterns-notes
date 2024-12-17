# Controlled and Uncontrolled Modals

## Overview


## Uncontrolled Modal
The modal is uncontrolled because it itself is controlling whether or not it is opened or closed.
```jsx
import { useState } from "react"
import styled from "styled-components"

const ModalBackground = styled.div`
  // styles
`;

const ModalBody = styled.div`
  // styles
`;


export const UncontrolledModal = ({
  children
}) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
        <button 
            onClick={() => setIsOpen(true)}
        >
            Open Modal
        </button>
        {isOpen && (
            <ModalBackground onClick={()=> setIsOpen(false)}>
                <ModalBody 
                    onClick={(e)=> e.stopPropagation()}
                >
                    <button 
                        onClick={()=> setIsOpen(false)}
                    >
                        Close Modal
                    </button>
                    {children}
                </ModalBody>
            </ModalBackground>
        )}
    </>
  )
}
```

### Usage Example:
The parent component has no control over what the modal is doing.

```jsx
import UncontrolledModal from "./UncontrolledModal"
function App() {
  return (
    <>
      <UncontrolledModal />
    </>
  )
}
```

## Controlled Modal
We add two props `isOpen` and `onRequestClose` and remove the `useState`.
- `isOpen`: `(type: boolean)` controlls whether to show or hide Modal and is passed by parent.
- `onRequestClose`:`(type: function)` allows the modal to request the parent component that the parent component stops showing it.

```jsx
const ControlledModal = ({
    children,
    isOpen,
    onRequestClose = ()=>{},

}) => {

    return isOpen ? (
        <ModalBackground 
          onClick={onRequestClose}
        >
          <ModalBody 
            onClick={(e)=> e.stopPropagation()}
          >
            <button 
              onClick={onRequestClose}
            >
              Close Modal
            </button>
            {children}
          </ModalBody>
        </ModalBackground>
    ) : null;
}
```

### Usage Example:
By making `isOpen` state in parent component and the use of `onRequestClose` prop parent is able to control the Modal behaviour.
```jsx
import ControlledModal from "./components/ControlledModal"
import { useState } from "react"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? "Hide Controlled Modal":"Show Controlled Modal"}
      </button>
      <ControlledModal 
        isOpen={isOpen} 
        onRequestClose={()=> {
          setIsOpen(false)
        }} 
      >
        <h1>Controlled Modal</h1>
        <p>This is a controlled modal</p>
      </ControlledModal>
    </>
  )
}
```
