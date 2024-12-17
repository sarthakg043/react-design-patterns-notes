import React, {useState, useEffect } from 'react'

const DataSource = ({
    children,
    getDataFunc = () => {},
    resourceName,
}) => {
    const [state, setState] = useState(null)


    useEffect(() => {
        (async () => {
            const data = await getDataFunc();
            setState(data)
        })();
    }, [getDataFunc])

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

export default DataSource