import { useState } from 'react'
import ControlledOnboardingFlow from './ControlledOnboardingFlow';

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

const WrapperForControlledOnboardingFlow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [onboardingData, setOnboardingData] = useState({});
    const onNext = stepData => {
        setOnboardingData({...onboardingData, ...stepData});
        setCurrentIndex(currentIndex + 1);
    };

    const onFinish = (stepData) => {
        setOnboardingData(prevData => ({...prevData, ...stepData}));
        console.log(onboardingData);
        alert("Onboarding complete!");
    }
  return (
    <>
        <ControlledOnboardingFlow
            currentIndex={currentIndex}
            onNext={onNext}
            onFinish={onFinish}
        >
            <Step1 />
            <Step2 />
            {onboardingData.age >=62 && <StepDiscount />}
            <Step3 />
        </ControlledOnboardingFlow>
    </>
  )
}

export default WrapperForControlledOnboardingFlow