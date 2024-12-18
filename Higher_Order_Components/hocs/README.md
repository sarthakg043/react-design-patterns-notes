# Higher Order Components

## Overview
Higher Order Components (HOCs) are a powerful pattern in React for reusing component logic. They are functions that take a component and return a new component with additional props or behavior. This document explores various HOCs such as `printProps` for logging props, `withUser` for loading user data, `withEditableUser` for editing user data, and the more generic `withEditableResource` for handling any resource. By using HOCs, we can create more modular, reusable, and maintainable code.

## Printing Props
We take `UserInfo` component from [previous example](../../Container_Components/ecommerce/README.md#userinfo-component).

And we make the Higher Order Component called `printProps` which will return the component being passed as argument but also print its props. In this way it doesn't affet the existing functionality of the component but extends it.

```jsx
const printProps = Component => {
  return (props) => {
    console.log('Props:', props)
    return <Component {...props} />
  }
}

export default printProps
```

### Usage:
Here we've made `UserInfoWrapper` assigned `printProps` with `UserInfo` as argument.
```jsx
import printProps from "./components/printProps"
import UserInfo from "./components/UserInfo"

const UserInfoWrapper = printProps(UserInfo)

function App() {
  return (
    <>
      <UserInfoWrapper name="John Doe" a="1" b={2} c={{name: "John"}} />
    </>
  )
}
```
The above code is equivalent to:
```jsx
export const UserInfoWrapper = (props) => {
  console.log('Props:', props)
  return <Component {...props} />
}
```
but making `printProps` a HOC is a better way of doing it as it makes it generic and more reusable.

This will pring the props in `console`. Don't mind the `Loading...` :-)

## Loading Data with HOCs
Similar to [Container Components](../../Container_Components/Readme.md), we make a UserInfo Loader but instead of passing component as children, we pass as argument, which makes it HOC. Let's call it `withUser`
```jsx
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const withUser = (Component, userId) => {
  return (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/users/${userId}`)
            setUser(response.data)
        })(); // IIFE: Immediately Invoked Function Expression

    }, [userId])

    return <Component {...props} user={user} />
  }
}
```
### Usage:
```jsx
// In App component logic
const UserInfoWithLoader = withUser(UserInfo, 123)

// In App.jsx body
<>
    <UserInfoWithLoader />
</>
```

## Modifying data with HOCs
We make a form for user Info through which a user can not only see current data but also modify it.

For that, we first create a `withEditableUser` HO component with same functionality as `withUser` HOC.

### `withEditableUser` Component:
```jsx
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

    return <Component {...props} user={user} />
  }
}
```
Now we make the functions for editing.


```jsx
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const withEditableUser = (Component, userId) => {
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
      })();
    }, [])

    const onChangeUser = changes => {
        setUser({...user, ...changes})
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
```
The `withEditableUser` is all set. Now we can work on `UserInfoForm`.

### `UserInfoForm` Component:
```jsx
import withEditableUser from './withEditableUser'

const UserInfoForm = withEditableUser(({user, onChangeUser, onSaveUser, onResetUser}) => {
    const {name, age, hairColor} = user || {}

    return user ? (
        <>
            <h2>User Info Form</h2>
            <form>
                <label>Name: 
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => onChangeUser({name: e.target.value})} 
                    />
                </label>
                <label>Age: 
                    <input 
                        type="number" 
                        value={age} 
                        onChange={e => onChangeUser({age: e.target.value})} 
                    />
                </label>
                <label>Hair Color: 
                    <input 
                        type="text" 
                        value={hairColor} 
                        onChange={e => onChangeUser({hairColor: e.target.value})} 
                    />
                </label>
                <br />
                <button type="button" onClick={onSaveUser}>Save</button>
                <button type="button" onClick={onResetUser}>Reset</button>
            </form>
        </>
    ): <p>Loading...</p>
}, "123");
```

### Usage:
```jsx
<>
    <UserInfoForm />
</>
```
This allows us to create any kind of component, we're not limited to onoy `UserInfoForm` component but any kind of component what might need to make changes to user in the server.

## Improving HOCs
Let's take our code one step further and make a `withEditableResource` HOC. \
A more generic one as it sounds and more <b>reusable</b>. \
We copy the `withEditableUser` and rename it `withEditableResource` and make the following changes.
- Define `resourcePath` and `resourceName` in arguments
```jsx
export const withEditableResource = (Component, resourcePath, resourceName) => {
    // rest of jsx
}
```
- Replace all states with `User` to `Data` like `originalUser` to `originalData` and so on...
- Dynamically set prop names
```jsx
function capitalizeFirstLetter(str) {
    if (!str) return str;
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

const resourceProps = {
    [resourceName]: data,
    [`onChange${capitalizeFirstLetter(resourceName)}`]: onChangeData,
    [`onSave${capitalizeFirstLetter(resourceName)}`]: onSaveData,
    [`onReset${capitalizeFirstLetter(resourceName)}`]: onResetData,
}

// then, inside return 
return  <Component 
            {...props} 
            {...resourceProps}
        />

```
- Lastly modify the urls
```jsx
const response = await axios.get(`/api${resourcePath}/${userId || productId}`)
```

Finally, the `withEditableResource` will look like:

### `withEditableResource` HO Component
```jsx
import React, {useState, useEffect} from 'react'
import axios from 'axios'

function capitalizeFirstLetter(str) {
    if (!str) return str;
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}


export const withEditableResource = (Component, resourcePath, resourceName) => {
  return (props) => {
    const { userId, productId} = props
    const [originalData, setOriginalData] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/api${resourcePath}/${userId || productId}`)
        setOriginalData(response.data)
        setData(response.data)
      })();
    }, [])

    const onChangeData = changes => {
        setData({...data, ...changes})
    }

    const onSaveData = async () => {
        const response = await axios.post(`/api${resourcePath}/${userId || productId }`, {[resourceName]: data})
        setOriginalData(response.data);
        setData(response.data);
    }

    const onResetData = () => {
        setData(originalData);
    }

    const resourceProps = {
        [resourceName]: data,
        [`onChange${capitalizeFirstLetter(resourceName)}`]: onChangeData,
        [`onSave${capitalizeFirstLetter(resourceName)}`]: onSaveData,
        [`onReset${capitalizeFirstLetter(resourceName)}`]: onResetData,
    }

    return  <Component 
                {...props} 
                {...resourceProps}
            />
  }
}
```

And we made `NewUserInfoForm` with only slight changes in arguments.

### `NewUserInfoForm` Component
```jsx
import withEditableResource from "./withEditableResource";

export const NewUserInfoForm = withEditableResource(({user, onChangeUser, onSaveUser, onResetUser}) => {
    // rest of jsx remains same as UserInfoForm
}, `/users`, "user");
```

### Usage:
```jsx
<>
    <NewUserInfoForm userId="123" />
</>
```

Similarly `NewProductInfoForm` can be made and used with the help of `withEditableResource` HOC.