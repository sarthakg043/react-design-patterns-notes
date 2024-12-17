const LargePersonListItem = ({
    person
}) => {
    const {name, age, hairColor, hobbies} = person;
    return (
        <>
            <h3>{name}</h3>
            <p>Age: {age} years</p>
            <p>Hair Color: {hairColor}</p>
            <h3>Hobbies:</h3>
            <ul>
                {hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
        </>
    )
}

export default LargePersonListItem