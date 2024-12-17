import CurrentUserLoader from "./components/CurrentUserLoader"
import ProductInfo from "./components/ProductInfo"
import ResourceLoader from "./components/ResourceLoader"
import UserInfo from "./components/UserInfo"
import UserLoader from "./components/UserLoader"

function App() {

  return (

    // Even though the CurrentUserLoader component doesn't have any props, we can still use it as a wrapper component.
    // It will fetch the current user data and pass it to the UserInfo component. Because the UserInfo component is a child of the CurrentUserLoader component.
    <>
      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>
      <hr />
      {/* The UserLoader component fetches the user data based on the userId prop. */}
      <UserLoader userId="234"> {/* The fetching logic goes in this */}
        <UserInfo /> {/* The rendering and styling logic goes in this*/}
      </UserLoader>
      <UserLoader userId="345">
        <UserInfo />
      </UserLoader>
      <UserLoader userId="123">
        <UserInfo />
      </UserLoader>
      <hr />
      <ResourceLoader resourceName="user" resourceUrl="/users/123">
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceName="product" resourceUrl="/products/1234">
        <ProductInfo />
      </ResourceLoader>
    </>
  )
}

export default App
