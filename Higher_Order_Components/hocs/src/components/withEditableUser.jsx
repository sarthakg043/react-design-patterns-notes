import React, {useState, useEffect} from 'react'
import axios from 'axios'

const withEditableUser = (Component, userId) => {
  return (props) => {
    // copy of server data
    const [originalUser, setOriginalUser] = useState(null)
    // current user data being edited
    const [user, setUser] = useState(null)

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/api/users/${userId}`)
        setOriginalUser(response.data)
        setUser(response.data)
      })(); // IIFE: Immediately Invoked Function Expression
    }, [])

    const onChangeUser = changes => {
        setUser({...user, ...changes})
        // this combines the original user data with the changes
        // first the original user data is spread into a new object
        // then the changes are made to that object
    }

    const onSaveUser = async () => {
        const response = await axios.post(`/api/users/${userId}`, {user})
        setOriginalUser(response.data);
        setUser(response.data);
    }

    const onResetUser = () => {
        setUser(originalUser);
    }

    return <Component 
                {...props} 
                user={user} 
                onChangeUser={onChangeUser}
                onSaveUser={onSaveUser}
                onResetUser={onResetUser}
            />
  }
}

export default withEditableUser