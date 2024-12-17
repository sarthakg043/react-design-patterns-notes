import React, {useState, useEffect } from 'react'
import axios from 'axios'

const CurrentUserLoader = ({
    children
}) => {
    // The parent only has fetching logic while the children have displaying logic.
    const [user, setUser] = useState(null)

    useEffect(() => {
        // This is a shorthand way to write an annonymous async function.
        (async () => {
            const response = await axios.get(`/api/current-user`)
            const currentUser = await response.data
            setUser(currentUser)
        })();
    }, [])

    // Now, we can pass the user object to the children of the CurrentUserLoader component.
    return (
        <>
            {/* This is a way to pass the user object to the children of the CurrentUserLoader component. */}
            {/* For each child, we check if it is a valid React element. If it is, we clone the element and pass the user object as a prop. */}
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { user });
                }
                return child;
            })}
        </>
    )
}

export default CurrentUserLoader