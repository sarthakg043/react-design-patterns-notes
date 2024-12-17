import React from 'react'

const SmallProductListItem = ({
  product
}) => {
  const { name, price } = product

  /* 
    This is gonna allow the parent component to essentially, 
    whatever kind of list is displaying this item, determing the overall styling of the item. 
    Instead of us putting style dive wrapper.
  */
  return (
      <h3>{name} - {price}</h3>
  )
}

export default SmallProductListItem