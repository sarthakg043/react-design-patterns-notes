# Summary of Layout Components

## Table of Contents
1. [Split Screen](#1-split-screen-component)
2. [Lists and List Items](#2-lists-and-list-items)
3. [Modals](#3-modals)

## 1: Split Screen
This code demonstrates the implementation of `SplitScreen` component in a React application. These components allow for dividing the screen into two resizable panels, providing a flexible layout solution. The `SplitScreen` component uses props to define the content and weight of each panel, while `SplitScreen2` uses children components. Both components leverage `styled-components` for styling, ensuring a clean and maintainable design.

[Code Example](01splitScreen/README.md)

## 2: Lists and List Items
This section covers the implementation of reusable list components in React, specifically focusing on rendering different types of list items for products and people. By using a single `RegularList` component, we can efficiently render both `SmallProductListItem` and `LargeProductListItem` for products, as well as `SmallPersonListItem` and `LargePersonListItem` for people. 

The `RegularList` component takes `items`, `resourceName`, and `itemComponent` as props, allowing dynamic rendering of list items. This approach enhances code reusability and maintainability by separating the list rendering logic from the item components. Key points to consider include the flexibility of the `RegularList` component and the importance of keeping item components free from layout-specific styling, enabling their use in various layouts.

[Code Example](02listsAndListItems/README.md)

## 3: Modals
This section explains the implementation of modal components in a React application. Modals are used to display content in an overlay, providing a way to focus user attention on specific information or interactions. The `Modal` component is designed to be reusable and flexible, allowing various types of content to be displayed within it. Key points include:

- **Reusable Modal Component**: The `Modal` component can wrap any content, making it versatile for different use cases.
- **Overlay Design**: Modals create an overlay effect, ensuring the content stands out.
- **Props for Customization**: The component accepts props to customize its behavior and appearance.
- **Component Composition**: Modals can be composed with other components to create complex interactions.

[Code Example](03modals/README.md)