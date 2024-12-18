import React, {useState, useEffect} from 'react'
import axios from 'axios'

const withUser = (Component, userId) => {
  return (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/users/${userId}`)
            setUser(response.data)
        })(); // IIFE: Immediately Invoked Function Expression

    }, [])

    return <Component {...props} user={user} />
  }
}

export default withUser