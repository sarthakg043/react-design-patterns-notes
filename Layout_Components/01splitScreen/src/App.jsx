import { SplitScreen, SplitScreen2 } from "./components/SplitScreen"


const LeftHandContent = ({name}) => {
    return (
        <h1>Left Hand Content {name}</h1>
    )
}

const RightHandContent = ({message}) => {
    return (
        <h1>Right Hand Content {message}</h1>
    )
}

function App() {
  return (
   <>
    {/* Passing in the LeftHandContent and RightHandContent components as props to the SplitScreen component */}
    <SplitScreen
      left={LeftHandContent}
      leftWeight={1}
      right={RightHandContent}
      rightWeight={3}
    />

    {/* Passing in the LeftHandContent and RightHandContent components as children to the SplitScreen component */}
    <SplitScreen2
      leftWeight={1}
      rightWeight={3}
    >
      <LeftHandContent 
        name="John Doe"
      />
      <RightHandContent
        message="Hello World"
      />
    </SplitScreen2>
   
   </>
  )
}

export default App
