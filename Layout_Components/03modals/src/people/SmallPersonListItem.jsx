/* This small person list item component doesn't contain any styling for where it should be placed in the layout.
   So we can use this component in any layout we want.
   We could use the styling in its parent component to determine how it should be displayed.
*/
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