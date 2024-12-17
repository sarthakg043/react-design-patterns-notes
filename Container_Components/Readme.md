# Summary of Container Components

## Table of Contents
1. [E-Commerce](#1-ecommerce)
2. [E-Commerce 2: Making UserLoader](#2-ecommerce-2)
3. [E-Commerce 3: Making ResourceLoader](#3-ecommerce-3)

## 1: Ecommerce
We separate the logic of fetching and displaying data by leveraging `React.Children.map` and `React.cloneElement`. Such that the parent container has `useState` and `useEffect` to load the data. The component is called `CurrentUserLoader`. This is given children component like `UserInfo` component which display User data.

```jsx
const CurrentUserLoader = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // fetching logic
    }, [])

    return (
        <>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { user });
                }
                return child;
            })}
        </>
    )
}
```
while `UserInfo` simply has displaying logic
```jsx
const UserInfo = ({ user }) => {
    const {name, age, hairColor, hobbies} = user || {};
    return user ? (
        // display user details
    ) : <p>Loading...</p>
}
```
This way multiple components can share the fetching logic and can use it by being passed as children.
```jsx
<CurrentUserLoader>
    <UserInfo />
</CurrentUserLoader>
```
>Notice how there are no props passed.

The props are passed dynamically by `React.cloneElement` method in `CurrentUserLoader`.

This makes the code clean and more meaningful.

[Code Example](ecommerce/README.md)

## 2: Ecommerce 2
The `CurrentUserLoader` in previous case is not very ideal as it is restricted. All it does is loads current user and passes it to children

We modify the `CurrentUserLoader` to load any user given the user's `id` and call it `UserLoader`.

[Code Example](ecommerce/README.md#making-userloader)

## 3: Ecommerce 3
Now, instead of having a container that loads a specific type of resource, let's create a generic container that can load any type of resource. We call it `ResourceLoader`. And we utilise the `js { [resourceName]: state }` to dynamically set prop name and state on fetching data.

```jsx
<ResourceLoader resourceName="product" resourceUrl="/products/1234">
    <ProductInfo />
</ResourceLoader>
```

[Code Example](ecommerce/README.md#making-resource-loader)

## 4: Ecommerce 4
The `ResourceLoader` is a good stopping point. However we can go one step ahead and make a component which doesn't even know where its data is coming from. Let's call it `DataSource` and we replace the `resourceUrl` prop by `getDataFunc = () => {}` prop which accepts a functiont o fetch data.

And we separate the fetching login in a file `dataFetchingFunctions.js` from where function required for specific needs like `getUserDataByID` can be imported and used in `jsx`.

[Code Example](ecommerce/README.md#making-datasource)