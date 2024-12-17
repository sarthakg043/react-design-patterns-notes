# Design Patterns in React

## What are Design Patterns?
Design patterns are typical solutions to commonly occurring problems in software design. They are like blueprints that can be customized to solve a particular design problem in your code. In the context of React, design patterns help in creating more maintainable, scalable, and reusable components.

Some of the key benefits of using design patterns in React include:

- Improved code readability and organization
- Easier maintenance and updates
- Enhanced reusability of components
- Better separation of concerns
- Simplified debugging and testing
- Consistent and predictable code behavior

### Common Challenges

- Creating reusable layouts
- Reusing complex logic between multiple components
- Working with forms
- Incorporating functional concepts into our code

## 1. Layout Components
Separate the component and the layout

```html
<div style={styles...}>
    <h1>Component here...</h1>
</div>
```
Make separate components with layout in one and components in other making it reusable.

```html
<div style={styles...}>
    {children}
</div>
```
```html
<>
<h1>Component here...</h1>
</>
```
> Our Components shouldn't know where they are being displayed on the page
<hr>

### [Example Code](Layout_Components/Readme.md)
1. [Split Screen Component](Layout_Components/01splitScreen/README.md)
2. [Lists and List Items](Layout_Components/02listsAndListItems/README.md)
3. [Modals](Layout_Components/03modals/README.md)

## 2. Container Components
- Components that take care of loading and managing ata for their childomponents.
- Separate the data fetching and rendering logic

Generally beginners do:
```jsx
const Child = () => {
    // load data...
    return (
        // display the data
    );
}
```
A lot of times we need the data `fetching/loading` logic to be shared among different Children of a `Container`.

We achieve this by splitting the component into `Container` and `Child` with data fetching and loading logic in `Container` and displaying in `Child`.

```jsx
const Container = () => {
    // load the data
    return (
        // pass data to children
    );
}
```
```jsx
const Childl = ({ data }) => {
    return (
        // display the data
    );
}
```

Example:
```jsx
class DataContainer extends React.Component {
    state = { data: null };

    componentDidMount() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return this.props.children(this.state.data);
    }
}
```
```jsx
<DataContainer url="/api/data">
    {data => data ? <DisplayComponent data={data} /> : <LoadingSpinner />}
</DataContainer>
```
> Container Components handle the logic, while child components handle the rendering
<hr>

### [Example Code](Container_Components/Readme.md)
1. [E-Commerce](Container_Components/ecommerce/README.md)