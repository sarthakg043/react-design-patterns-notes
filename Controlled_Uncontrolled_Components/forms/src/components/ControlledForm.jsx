import { useState, useEffect } from "react";

const ControlledForm = () => {
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

export default ControlledForm