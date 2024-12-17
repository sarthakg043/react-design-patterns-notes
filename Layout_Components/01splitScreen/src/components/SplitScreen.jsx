import React from 'react'
import styled from 'styled-components'

/* 
   Here we are using styled-components to style our SplitScreen component.
   We are using a Container div to hold the two Panel divs.
   The Panel divs are styled to have a width of 45% and a height of 100%.
   We are also using the weight prop to determine the flex property of the Panel divs.
   The weight prop is passed in as a prop to the SplitScreen component.
   The weight prop is then passed in as a prop to the Panel component.
   The weight prop is used to determine the flex property of the Panel component.
   This demonstrates how to separate the layout of a component into smaller components.
   This makes it easier to manage the layout of the component.
   This also makes it easier to reuse the layout of the component in other components.
   And the syntax becomes much more meaningful and clean.
*/

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

export const SplitScreen = ({
    left:Left, 
    right:Right,
    leftWeight =1,
    rightWeight= 1,
}) => {
  return (
    <Container>
        <Panel weight={leftWeight}>
            <Left />
        </Panel>
        <Panel weight={rightWeight}>
            <Right />
        </Panel>
    </Container>
  )
}

// This is an alternative way to write the SplitScreen component using children instead of props.
// This is a more flexible way to write the SplitScreen component.
export const SplitScreen2 = ({
    children,
    leftWeight =1,
    rightWeight= 1,
}) => {

    const [left, right] = children
    return (
        <Container>
            <Panel weight={leftWeight}>
                {left}
            </Panel>
            <Panel weight={rightWeight}>
                {right}
            </Panel>
        </Container>
  )
}