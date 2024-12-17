# React Controlled and Uncontrolled Components

## Overview
This document provides an in-depth comparison between controlled and uncontrolled components in React, focusing on form handling. It includes code examples and explanations for both approaches, highlighting the differences in state management and user input handling. The uncontrolled form example demonstrates how to use refs to access form values upon submission, while the controlled form example shows how to use the `useState` hook and `onChange` events to manage and validate form input in real-time.

## Uncontrolled Form

```jsx
import { createRef } from "react"

export const UncontrolledForm = () => {
    const nameInput = createRef();
    const ageInput = createRef();
    const hairColorInput = createRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(nameInput.current.value)
        console.log(ageInput.current.value)
        console.log(hairColorInput.current.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
               type="text" 
               name="name" 
               id="" placeholder='Name' 
               ref={nameInput}
            />

            <input 
                type="number" 
                name="age" 
                id="" 
                placeholder='Age' 
                ref={ageInput} 
            />

            <input 
                type="text" 
                name="hairColor" 
                id="" 
                ref={hairColorInput} 
                placeholder='Hair Colour' 
            />

            <input 
                type="submit" 
                value="Submit" 
            />

        </form>
    )
}
```
- The form is uncontrolled because it doesn't care what values are in input unless an event like `submit` is triggered.
- Each of the input is handling its own state untill `submit` is triggered.
- After `submit` we get the values of the input fields.

### Usage:

```jsx
import UncontrolledForm from "./components/UncontrolledForm"

function App() {

  return (
    <>
      <UncontrolledForm />
    </>
  )
}
```

## Controlled Form
We track values of each input by `useState` hook and leverage `onChange` attribute to track changes to input field.

```jsx
import { useState, useEffect } from "react";

export const ControlledForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if(name.length < 2){
            setError('Name must be at least 2 characters long')
        }
        else if(age < 18){
            setError('You must be at least 18 years old')
        }
        else if(hairColor.length < 3){
            setError('Hair colour must be at least 3 characters long')
        }
        else{
            setError('')
        }

    }, [name, age, hairColor]);

    return (
        <form>
            {error && <p style={{color: "red"}}>{error}</p>}
            <input 
                type="text" 
                name="name" 
                id="" 
                placeholder='Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="number" 
                name="age" 
                id="" 
                placeholder='Age' 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))} 
            />
            <input 
                type="text" 
                name="hairColor" 
                id="" 
                placeholder='Hair Colour' 
                value={hairColor} 
                onChange={(e) => setHairColor(e.target.value)} 
            />

            <button>Submit</button>

        </form>
    )
}
```
- By this we can give user feedback on his/her input based on what they entered before clicking `submit`.
- This also makes error handling easier.