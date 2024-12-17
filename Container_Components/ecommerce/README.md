# React Container Components

## Overview
The code demonstrates a React application where the parent component (`CurrentUserLoader`) is responsible for fetching user data, and the child component (`UserInfo`) is focused on displaying this data. The structure follows the "Container-Presenter" pattern, which separates concerns of data fetching and UI presentation.

---

## `App` Component
The `App` component serves as the entry point for rendering the `CurrentUserLoader` and `UserInfo` components.

### Code:
```jsx
import CurrentUserLoader from "./components/CurrentUserLoader";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <CurrentUserLoader>
      <UserInfo />
    </CurrentUserLoader>
  );
}

export default App;
```

### Explanation:
1. **Wrapper Component**: The `CurrentUserLoader` is used as a wrapper around `UserInfo`. This ensures that user data is fetched before being passed to the `UserInfo` component.
2. **Prop Passing**: `UserInfo` is nested inside `CurrentUserLoader`, and the `user` object is passed down automatically as a prop.
3. **Separation of Concerns**: 
   - **Parent (`CurrentUserLoader`)**: Responsible for data fetching.
   - **Child (`UserInfo`)**: Focused solely on displaying the fetched data.

---

## `UserInfo` Component
The `UserInfo` component is designed to present the user data in a structured format.

### Code:
```jsx
const UserInfo = ({ user }) => {
  const { name, age, hairColor, hobbies } = user || {};

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
  ) : (
    <p>Loading...</p>
  );
};

export default UserInfo;
```

### Explanation:
1. **Destructuring**: The `user` object is destructured to extract its properties (`name`, `age`, `hairColor`, `hobbies`).
2. **Conditional Rendering**: 
   - If `user` is `null`, the component displays a "Loading..." message.
   - Once the data is available, it renders user information.
3. **List Rendering**:
   - The `hobbies` array is iterated using `.map()`, and each hobby is displayed as a list item.
   - The `key` attribute ensures efficient rendering by React.
4. **Responsibility**: This component is strictly for displaying data and contains no fetching logic.

---

## `CurrentUserLoader` Component
The `CurrentUserLoader` is responsible for fetching the current user data and passing it to its child components.

### Code:
```jsx
const CurrentUserLoader = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/current-user`);
      const currentUser = await response.data;
      setUser(currentUser);
    })();
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { user });
        }
        return child;
      })}
    </>
  );
};
```

### Explanation:
1. **State Management**:
   - `useState(null)` initializes the `user` state as `null`.
   - `setUser` updates the state once data is fetched.
2. **Data Fetching**:
   - An `async` function is defined inside `useEffect` to fetch user data from `/api/current-user`.
   - The `axios` library is used for making the API request.
   - The `user` data is stored in the component's state after being fetched.
3. **Children Handling**:
   - The `children` prop represents any nested components (`UserInfo` in this case).
   - `React.Children.map()` is used to iterate over all children.
   - If a child is a valid React element, `React.cloneElement` is used to pass the `user` object as a prop to the child.
4. **Responsibility**: This component handles only data fetching and delegation of user data to its children.

---

## Key Concepts Highlighted
1. **Separation of Concerns**:
   - The parent handles the logic (fetching user data).
   - The child handles the presentation (displaying user data).
2. **Component Composition**:
   - `CurrentUserLoader` acts as a reusable wrapper to fetch and distribute user data.
   - `UserInfo` becomes agnostic of the data source.
3. **Conditional Rendering**:
   - Ensures a smooth user experience by displaying "Loading..." while data is being fetched.
4. **Prop Management**:
   - `React.cloneElement` dynamically injects the `user` prop into child components, maintaining flexibility and reusability.

---

## Usage Flow
1. `App` renders `CurrentUserLoader` and nests `UserInfo` inside it.
2. `CurrentUserLoader` fetches user data and passes it to `UserInfo` using `React.cloneElement`.
3. `UserInfo` displays the data once available.

This approach ensures scalability and maintainability by keeping data-fetching and UI logic separate.
<hr>

## Making UserLoader

We take the same `CurrentUserLoader` component and add `userId` prop to it.

```jsx
const UserLoader = ({
    children,
    userId
}) => {
  // Fetching logic with userId
}
```
The children only have displaying logic so they remain same

```html
<UserLoader userId="345">
  <UserInfo />
</UserLoader>
```
This is how we refactored the `CurrenUserLoader` into a more generic `UserLoader`.

## Making Resource Loader
This is a more generic loader made to load any type of resource and not just users.

