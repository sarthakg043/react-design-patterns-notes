import { createRef } from "react"

const UncontrolledForm = () => {
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
        <input type="text" name="name" id="" placeholder='Name' ref={nameInput} />
        <input type="number" name="age" id="" placeholder='Age' ref={ageInput} />
        <input type="text" name="hairColor" id="" ref={hairColorInput} placeholder='Hair Colour' />
        <input type="submit" value="Submit" />
    </form>
  )
}

export default UncontrolledForm