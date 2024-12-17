# Controlled and Uncontrolled Onboarding Flows

## Overview
An onboarding flow is a series of steps or processes that new users go through when they start using a product or service. The goal of an onboarding flow is to help users become familiar with the product, understand its value, and learn how to use it effectively. This can include guided tours, tutorials, setup wizards, and other interactive elements designed to engage and educate users.

## Uncontrolled Onboarding Flow
An uncontrolled onboarding flow in React involves managing the state internally within the component, allowing each step to progress by updating the state. This can be achieved by passing a `goToNext` function as a prop to each step component, which updates the current step index and collects data from each step. The collected data is stored in a state variable and can be passed to a final function `onFinish` once the onboarding process is complete. This approach simplifies the flow by handling state transitions and data collection internally, without requiring external state management.

### Props:
- `children`: To pass children components to it.
- `onFinish`: function which runs when the Onboarding Flow is complete.

### State Variables
- `onboardingData`:`(type: Object)` Contains all of the data which we collect from the user over the course of onboarding.
- `currentIndex`: `(type: Number)` Determines which of the children that we passed to the Onboarding Flow must be shown currently i.e. current step the user is supposed to be.

### Example:
```jsx
const UncontrolledOnboardingFlow = ({children, onFinish}) => {
    const [onboardingData, setOnboardingData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentChild = React.Children.toArray(children)[currentIndex];
    return (
        // jsx of Onboarding Component
    )
}
```

```jsx
const currentChild = React.Children.toArray(children)[currentIndex];
```
This covers the case when only single child is passed as inside logic will be dealing children as Array but if single child is passed, it won't be array, so we convert it to array.

### Usage:
```jsx
import UncontrolledOnboardingFlow from "./components/UncontrolledOnboardingFlow"

const Step1 = () => {
  return <h1>Step 1</h1>
}
const Step2 = () => {
  return <h1>Step 2</h1>
}
const Step3 = () => {
  return <h1>Step 3</h1>
}

function App() {

  return (
    <>
      <UncontrolledOnboardingFlow>
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledOnboardingFlow>
    </>
  )
}

export default App
```
However, right now `Step` components don't have ability to go to next step. We can do it in `UncontrolledOnboardingFlow.jsx` by defining `Previous` and `Next` buttons which functionality to add and substract 1 from `currentIndex` but a better way is to make props `goToNext` for each `Step` component.
```jsx
const Step1 = ({goToNext}) => {
  return( 
    <>
      <h1>Step 1</h1>
      <button onClick={goToNext}>Next</button>
    </>
  )
}
```
And define `goToNext` in `UncontrolledOnboardingFlow` Component which will pass it to children.
```jsx
const UncontrolledOnboardingFlow = ({children, onFinish}) => {
    const [onboardingData, setOnboardingData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex(prev => prev+1);
    };

    const currentChild = React.Children.toArray(children)[currentIndex];
    if(React.isValidElement(currentChild)){
        return React.cloneElement(currentChild, {goToNext})
    }

    return currentChild;
}
```
### Collecting Onboarding Data
Modifying `goToNext` to allow each step to pass some data.
```jsx
const goToNext = stepData => {
    const nextIndex = currentIndex + 1;
    // Merge the step data with the existing onboarding data 
    const updatedData = {
        ...onboardingData,
        ...stepData
    };

    // If we are at the end of the onboarding flow, call onFinish
    if(nextIndex >= React.Children.count(children)){
        onFinish(updatedData);
    } else {
        setCurrentIndex(nextIndex);
    }
    // Update the onboarding data
    setOnboardingData(updatedData);
};
```

Now, in `Step` components `goToNext` can be used to pass data.
```jsx
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
```
And giving a simple function to `onFinish`
```jsx
<UncontrolledOnboardingFlow
  onFinish={data => console.log(data)}
>
  <Step1 />
  <Step2 />
  <Step3 />
</UncontrolledOnboardingFlow>
```
Rest of the code remains same.

> This Onboarding flow is uncontrolled because the parent has very little control over it. Let's say we want to hind and show certain steps based on the data being provided by the user.

## Controlled Onboarding Flow
Instead of having `onboardingData` and `currentIndex` as states, we can have them as props to be passed by the parent.

Also the `onNext` prop is made which is passed by parent
```jsx
const ControlledOnboardingFlow = ({
    children, 
    onFinish,
    currentIndex,
    onNext,
}) => {

    const goToNext = stepData => {
        if(currentIndex === React.Children.toArray(children).length - 1){
            onFinish(stepData);
            return;
        }
        onNext(stepData);
    }

    const currentChild = React.Children.toArray(children)[currentIndex];
    if(React.isValidElement(currentChild)){
        return React.cloneElement(currentChild, {goToNext})
    }

    return currentChild;
}
```
The parent maintains the states for `onboardingData` and `currentIndex` and also defines `onNext` and `onFinish` functions.
```jsx
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
```

> See that `Controlled Version` gives us the ability to see the data and dynamically render steps ```jsx {onboardingData.age >=62 && <StepDiscount />}```

Also note that in `ControlledOnboardingFlow`
```jsx
if(currentIndex === React.Children.toArray(children).length - 1){
  onFinish(stepData);
  return;
}
````
helps us to keep track of current number of children to find the last Step accurately.