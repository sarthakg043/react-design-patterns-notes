const UserInfo = ({
    user
}) => {

    // The Child only has displaying logic while the Parent has the fetching logic.
    const {name, age, hairColor, hobbies} = user || {};
    // If the user object is null, we return {} as the default value.
    return user ? (
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
    ) : <p>Loading...</p>
}

export default UserInfo