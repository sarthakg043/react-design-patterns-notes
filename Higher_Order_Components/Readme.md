# Summary of Higher Order Components

## Table of Contents
1. [Printing Props](#printing-props)
2. [Loading Data with HOCs](#loading-data-with-hocs)
3. [Modifying Data with HOCs](#modifying-data-with-hocs)
4. [Improving HOCs](#improving-hocs)
5. [Difference between HOC and Container Components](#difference-between-hoc-and-container-components)

## Printing Props
We make the Higher Order Component called `printProps` which will return the component being passed as argument but also print its props. In this way it doesn't affet the existing functionality of the component but extends it. 

[Code Example](hocs/README.md#printing-props)

## Loading Data with HOCs
Similar to [Container Components](../Container_Components/Readme.md), we make a UserInfo Loader but instead of passing component as children, we pass as argument, which makes it HOC.

[Code Example](hocs/README.md#loading-data-with-hocs)

## Modifying Data with HOCs
We make a form for user Info through which a user can not only see current data but also modify it.

[Code Example](hocs/README.md#modifying-data-with-hocs)

## Improving HOCs
Let's take our code one step further and make a `withEditableResource` HOC. \
A more generic one as it sounds and more <b>reusable</b>. \
We copy the `withEditableUser` and rename it `withEditableResource` and make the following changes.

[Code Example](hocs/README.md#improving-hocs)

## Difference between HOC and Container Components

The **Container Component** pattern and **Higher-Order Component (HOC)** pattern are both used in React for organizing and reusing logic, but they are applied in different contexts and serve slightly different purposes.

Let's break down each pattern, how they are used, and when to use them.

---

### 1. **Container Component Pattern**

The **Container Component** pattern is primarily concerned with separating **logic** and **UI** in React applications. The idea is to have **container components** that manage the logic (state, data fetching, event handling, etc.) and **presentational components** (also known as "dumb" components) that are purely concerned with rendering UI.

#### Key Characteristics:
- **Container Components** (also called smart components):
  - Manage the state and logic of the application.
  - Pass data and callbacks as props to presentational components.
  - May perform data fetching or other side effects.
  
- **Presentational Components** (also called dumb components):
  - Only responsible for rendering UI.
  - Receive data and callbacks as props from container components.
  - Typically stateless and reusable.

#### Example:

```jsx
// Presentational Component (Dumb Component)
const UserProfile = ({ user, onEdit }) => (
  <div>
    <h1>{user.name}</h1>
    <button onClick={onEdit}>Edit</button>
  </div>
);

// Container Component (Smart Component)
class UserProfileContainer extends React.Component {
  state = {
    user: { name: 'John Doe' }
  };

  handleEdit = () => {
    this.setState({ user: { name: 'Jane Doe' } });
  };

  render() {
    return <UserProfile user={this.state.user} onEdit={this.handleEdit} />;
  }
}

export default UserProfileContainer;
```

#### When to Use:
- **Separation of Concerns**: When you want to separate the concerns of managing data and displaying the UI. This pattern is helpful when the logic is complex (e.g., data fetching, handling user input) and needs to be kept separate from UI concerns.
- **Reusability**: It makes it easy to reuse presentational components in different contexts since they are not tied to specific data or logic.

#### Pros:
- **Clear Separation of Logic and UI**: Makes the code more readable and maintainable.
- **Easier to Test**: Logic can be tested independently in container components, and presentational components can be tested as simple rendering units.
  
#### Cons:
- **More Boilerplate**: You'll need to create two components for each "feature" (one container and one presentational).
- **Potential Prop Drilling**: Data passed from container components to deeply nested presentational components can result in prop drilling.

---

### 2. **Higher-Order Component (HOC) Pattern**

A **Higher-Order Component** (HOC) is a function that takes a component and returns a new component with additional props, functionality, or data. HOCs are used to **enhance** components by injecting logic or behavior without modifying the original component.

An HOC is a **function** that takes a component as an argument and returns a new component. It is a **pattern** for reusing component logic across multiple components.

#### Key Characteristics:
- **Reusable Logic**: HOCs allow you to reuse logic across multiple components.
- **No Direct Modification**: Instead of modifying the component directly, the HOC wraps the original component and enhances its functionality.
- **Component Composition**: Multiple HOCs can be composed to apply multiple pieces of logic to a component.

#### Example:

```jsx
// HOC that adds a loading state to a component
const withLoading = (WrappedComponent) => {
  return class WithLoading extends React.Component {
    state = { loading: true };

    componentDidMount() {
      // Simulate a data fetch
      setTimeout(() => this.setState({ loading: false }), 2000);
    }

    render() {
      const { loading } = this.state;
      return loading ? <div>Loading...</div> : <WrappedComponent {...this.props} />;
    }
  };
};

// Regular Component
const UserProfile = ({ user }) => <div>{user.name}</div>;

// HOC Enhanced Component
const UserProfileWithLoading = withLoading(UserProfile);

export default UserProfileWithLoading;
```

In the example above, `withLoading` is an HOC that enhances the `UserProfile` component by adding a loading state and simulating a data fetch.

#### When to Use:
- **Cross-Cutting Concerns**: When you have logic that needs to be applied across multiple components, such as authentication checks, logging, error boundaries, or data fetching.
- **Component Reusability**: When you want to add the same logic (like a loading spinner or authentication check) to many components without repeating yourself.

#### Pros:
- **Code Reusability**: Allows you to reuse the same logic across different components without changing the component structure.
- **Separation of Concerns**: Logic is abstracted away from the component and can be applied dynamically.
  
#### Cons:
- **Wrapper Hell**: If many HOCs are applied, it can result in deeply nested components that can be hard to debug and maintain.
- **Prop Collisions**: If an HOC injects props that the wrapped component also uses, you may encounter issues with prop collisions.
- **Harder to Debug**: The logic is encapsulated, which can make it harder to debug, especially if there are multiple HOCs wrapping a single component.

---

### **Differences Between Container Components and HOCs**

| **Aspect**                  | **Container Component**                          | **Higher-Order Component (HOC)**                |
|-----------------------------|--------------------------------------------------|------------------------------------------------|
| **Purpose**                 | Separates UI from logic, manages state and data. | Enhances a component by adding functionality.  |
| **Structure**               | Two components: container (logic) + presentational (UI). | One component wrapped by a higher-order function. |
| **Reusability**             | Reuse presentational components across different container components. | Reuse logic (e.g., loading state, authentication) across many components. |
| **State Management**        | Manages state and side effects directly.        | Does not directly manage state (but can enhance the wrapped component). |
| **Complexity**              | Can lead to more boilerplate with multiple components. | Can lead to "wrapper hell" with nested components. |
| **Use Case**                | Best for separating logic and UI concerns.      | Best for adding cross-cutting logic or behavior to multiple components. |

---

### **When to Use Each Pattern**

- **Use the Container Component Pattern** when:
  - You need to manage state, data fetching, or other side effects that should be decoupled from the UI.
  - You have **complex logic** that manipulates or transforms data and you want to keep that separate from the UI rendering.
  - You prefer to keep components more "focused" on either handling logic or rendering UI.

- **Use the HOC Pattern** when:
  - You have **reusable logic** that needs to be shared across multiple components (e.g., loading state, authentication, error boundaries).
  - You want to **augment the functionality of a component** without changing its original implementation.
  - You need to **compose behaviors** or logic across multiple components dynamically.

---

### **Summary**

- **Container Components** separate **logic** from **presentation**. They are great for managing application state and handling side effects while delegating the UI rendering to presentational components.
- **HOCs** are higher-order functions that **enhance** components with additional functionality or logic. They are great for reusing common functionality (like authentication, error handling, or data fetching) across many components.

Both patterns promote code reuse and help in keeping your components clean and focused on a single responsibility. When you need to encapsulate reusable logic, HOCs are ideal. When you need to manage state and business logic while keeping the UI separate, container components are the better choice.
