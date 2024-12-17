import React, {useState, useEffect } from 'react'
import axios from 'axios'

const ResourceLoader = ({
    children,
    resourceUrl,
    resourceName,
}) => {
    const [state, setState] = useState(null)


    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api${resourceUrl}`)
            setState(response.data)
        })();
    }, [resourceUrl])

    return (
        <>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    // [resourceName]: state is a way to dynamically set the key for the state object.
                    return React.cloneElement(child, { [resourceName]: state });
                }
                return child;
            })}
        </>
    )
}

export default ResourceLoader