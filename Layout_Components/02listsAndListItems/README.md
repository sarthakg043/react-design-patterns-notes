# React Lists and List Items

We have `products` as `SmallProductListItem` and `LargeProductListItem` and `people` as `SmallPersonListItem` and `LargePersonListItem`.
Now, Instead of creating two lists for each category we create single list which can be used to render both categories and their subtypes making our layout much more reusable and optimized.

## Component Tree

Here is the component tree for the example provided:

```
App
├── RegularList
│   ├── SmallPersonListItem
│   ├── LargePersonListItem
│   ├── SmallProductListItem
│   └── LargeProductListItem
│
├── NumberedList
│   ├── SmallPersonListItem
│   ├── LargePersonListItem
│   ├── SmallProductListItem
│   └── LargeProductListItem
```
> With just 6 components we made 8 different combinations. This might not seem like a big deal, but when you have a lot of lists to display, it can save a lot of time.

- `App`: The root component that renders the `RegularList` component twice with different item components.
- `RegularList`: A reusable component that renders a list of items using a specified item component.
    - `SmallPersonListItem`: A component that renders a person's name and age.
    - `LargePersonListItem`: A component that renders a person's name, age, hair color, and hobbies.

## Example Usage

Here is an example of how you can use the `RegularList` component to render different types of list items:

```jsx
import LargePersonListItem from "./people/LargePersonListItem";
import SmallPersonListItem from "./people/SmallPersonListItem";
import RegularList from "./RegularList";

function App() {
  return (
    <>
      <RegularList 
        items={people}
        resourceName="person"
        itemComponent={SmallPersonListItem}
      />
      <hr />
      <RegularList 
        items={people}
        resourceName="person"
        itemComponent={LargePersonListItem}
      />
    </>
  )
}

export default App;
```

In this example, the `RegularList` component is used to render both `SmallPersonListItem` and `LargePersonListItem` components, making the list rendering logic reusable and more maintainable.

## RegularList Component

The `RegularList` component is a reusable component that renders a list of items using a specified item component.

### Props

- `items` (Array): The array of items to be rendered.
- `resourceName` (string): The name of the resource to be used as a prop name for each item.
- `itemComponent` (React.Component): The component used to render each item in the list.

```jsx
    <ItemComponent 
        key={index} 
        {...{[resourceName]: item}} 
    />
```
- the above line `{...{[resourceName]: item}} ` is equivalent to: `person={item}`
- when we pass `resourceName`="`person`" and the item is `{name: "John", age: 25}`
- so we can dynamically set propNames and their values

### Making Items Meaningful
```jsx
const SmallPersonListItem = ({
    person
}) => {
    const {name, age} = person;
  return (
    <p>
        {name} is {age} years old.
    </p>
  )
}

export default SmallPersonListItem

const LargePersonListItem = ({
    person
}) => {
    const {name, age, hairColor, hobbies} = person;
    return (
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
    )
}

export default LargePersonListItem
```
> These list item components don't contain any styling for where it should be placed in the layout. So we can use this component in any layout we want. 

> We could use the styling in its parent component to determine how it should be displayed.


### Example

Here is an example of how to use the `RegularList` component:

```jsx
const people = [{ name: "John", age: 25 }, { name: "Jane", age: 30 }];

<RegularList 
    items={people}
    resourceName="person" 
    itemComponent={SmallPersonListItem}
/>
```
This will render:

```html
<div>John is 25 years old</div>
<div>Jane is 30 years old</div>
```