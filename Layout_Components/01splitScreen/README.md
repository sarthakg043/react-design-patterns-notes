# React SplitScreen Component

This document provides an overview of the `SplitScreen` and `SplitScreen2` components used in a React application. These components are designed to split the screen into two panels, allowing for flexible layout management.

## Components

### `SplitScreen`

The `SplitScreen` component takes the following props:
- `left`: A React component to be rendered on the left side.
- `right`: A React component to be rendered on the right side.
- `leftWeight`: A number representing the flex weight of the left panel (default is 1).
- `rightWeight`: A number representing the flex weight of the right panel (default is 1).

Example usage:
```jsx
<SplitScreen
    left={LeftHandContent}
    leftWeight={1}
    right={RightHandContent}
    rightWeight={3}
/>
```

### `SplitScreen2`

The `SplitScreen2` component takes the following props:
- `children`: An array of two React components to be rendered on the left and right sides.
- `leftWeight`: A number representing the flex weight of the left panel (default is 1).
- `rightWeight`: A number representing the flex weight of the right panel (default is 1).

Example usage:
```jsx
<SplitScreen2 leftWeight={1} rightWeight={3}>
    <LeftHandContent name="John Doe" />
    <RightHandContent message="Hello World" />
</SplitScreen2>
```

## Styled Components

The layout is styled using `styled-components`. The main styled components are:

### `Container`

A flex container that holds the two panels:
```jsx
const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    box-sizing: border-box;
`;
```

### `Panel`

A flex item representing each panel:
```jsx
const Panel = styled.div`
    display: flex;
    flex: ${props => props.weight};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
    padding: 20px;
    margin: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;
```

## Summary

The `SplitScreen` and `SplitScreen2` components demonstrate how to create flexible and reusable layout components in React. By using `styled-components`, the layout is clean and easy to manage, making it simple to reuse in other parts of the application.