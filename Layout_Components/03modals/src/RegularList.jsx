const RegularList = ({
    items,
    resourceName,
    itemComponent:ItemComponent,
}) => {
  return (
    <>
        {items.map((item, index) => (
            <ItemComponent 
                key={index} 
                {...{[resourceName]: item}} 
                // the above line is equivalent to:
                // person={item}
                // when we pass resourceName="person" and the item is {name: "John", age: 25}
                // so we can dynamically set propNames and their values
            />
        ))}
    </>
  )
}

export default RegularList