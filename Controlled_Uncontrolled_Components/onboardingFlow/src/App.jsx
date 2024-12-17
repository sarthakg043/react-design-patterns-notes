import { useState } from "react";
import UncontrolledOnboardingFlow from "./components/UncontrolledOnboardingFlow"
import WrapperForControlledOnboardingFlow from "./components/WrapperForControlledOnboardingFlow";

const Step1 = ({goToNext}) => {
  const [name, setName] = useState("");
  return( 
    <>
      <h1>Step 1</h1>
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => goToNext({name: name})}>Next</button>
    </>
  )
}
const Step2 = ({goToNext}) => {
  const [age, setAge] = useState("");
  return( 
    <>
      <h1>Step 2</h1>
      <input 
        type="number" 
        placeholder="Age" 
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <button onClick={() => goToNext({age: age})}>Next</button>
    </>
  )
}
const Step3 = ({goToNext}) => {
  const [hairColour, setHairColour] = useState("");
  return( 
    <>
      <h1>Step 3</h1>
      <input 
        type="text" 
        placeholder="Hair Colour"
        value={hairColour}
        onChange={e => setHairColour(e.target.value)}
      />
      <button onClick={() => goToNext({hairColour})}>Next</button>
    </>
  )
}

const StepDiscount = ({goToNext}) => {
  const [discount, setDiscount] = useState(false);
  return( 
    <>
      <h1>Step 4</h1>
      <p>Congratulation! You qualify for our senior discount.</p>
      <label htmlFor="discountInputl">
        Do you want to apply the discount?
      </label>
      <input 
        type="checkbox" 
        checked={discount}
        onChange={e => setDiscount(e.target.checked)}
        id="discountInput"
      />
      <button onClick={() => goToNext({discount})}>Next</button>
    </>
  )
}

function App() {

  return (
    <>
      <UncontrolledOnboardingFlow
        onFinish={data => {
          console.log(data)
          alert("Onboarding complete!")
        }}
      >
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledOnboardingFlow>
      <hr />
      <WrapperForControlledOnboardingFlow />
    </>
  )
}

export default App
