import NumberedList from "./NumberedList";
import LargePersonListItem from "./people/LargePersonListItem";
import SmallPersonListItem from "./people/SmallPersonListItem";
import LargeProductListItem from "./products/LargeProductListItem";
import SmallProductListItem from "./products/SmallProductListItem";
import RegularList from "./RegularList";

const people = [{
	name: 'John Doe',
	age: 54,
	hairColor: 'brown',
	hobbies: ['swimming', 'bicycling', 'video games'],
}, {
	name: 'Brenda Smith',
	age: 33,
	hairColor: 'black',
	hobbies: ['golf', 'mathematics'],
}, {
	name: 'Jane Garcia',
	age: 27,
	hairColor: 'blonde',
	hobbies: ['biology', 'medicine', 'gymnastics'],
}];

const products = [{
	name: 'Flat-Screen TV',
	price: '$300',
	description: 'Huge LCD screen, a great deal',
	rating: 4.5,
}, {
	name: 'Basketball',
	price: '$10',
	description: 'Just like the pros use',
	rating: 3.8,
}, {
	name: 'Running Shoes',
	price: '$120',
	description: 'State-of-the-art technology for optimum running',
	rating: 4.2,
}];


function App() {


  return (
    <>
    {/* Generally we make different components for different types of lists like SmallPersonListItem will have its own List to display with styles and LargePersonListItem will have its own, but we can make one Regular List and use the same component for different types of lists */}

    <RegularList 
      items={people}
      resourceName="person" // this is the name of the prop that SmallPersonListItem and LargePersonListItem are expecting
      itemComponent={SmallPersonListItem}
    />
    <hr />
    <RegularList 
      items={people}
      resourceName="person" // this is the name of the prop that SmallPersonListItem and LargePersonListItem are expecting
      itemComponent={LargePersonListItem}
    />

	<hr />

	<RegularList
		items={products}
		resourceName="product"
		itemComponent={SmallProductListItem}
	/>
	<hr />
	<NumberedList
		items={products}
		resourceName="product"
		itemComponent={LargeProductListItem}
	/>
    </>

	// with 6 components, we can display 6 different lists with different styles using just 2 components for lists
	// this might not seem like a big deal, but when you have a lot of lists to display, it can save a lot of time.
  )
}

export default App
