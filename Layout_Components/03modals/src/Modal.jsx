import { useState } from "react"
import styled from "styled-components"

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
`;


const Modal = ({
  children
}) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <ModalBackground onClick={()=> setIsOpen(false)}>
          <ModalBody onClick={(e)=> e.stopPropagation()}>
            {/* onClick={(e)=> e.stopPropagation()} prevents the ModalBackground from closing the modal when clicked */}
            {/* It stops the event from bubbling up to the parent element */}
            <button onClick={()=> setIsOpen(false)}>Close Modal</button>
            {children}
          </ModalBody>
        </ModalBackground>
      )}
    </>
  )
}

export default Modal