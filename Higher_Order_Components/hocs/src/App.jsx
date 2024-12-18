import NewProductInfoForm from "./components/NewProductInfoForm"
import NewUserInfoForm from "./components/NewUserInfoForm"
import printProps from "./components/printProps"
import UserInfo from "./components/UserInfo"
import UserInfoForm from "./components/UserInfoForm"
import withUser from "./components/withUser"

const UserInfoWrapper = printProps(UserInfo)

const UserInfoWithLoader = withUser(UserInfo, 123)

function App() {

  return (
    <>
      <h1>Higher Order Components</h1>
      <UserInfoWrapper name="John Doe" a="1" b={2} c={{name: "John"}} />
      <UserInfoWithLoader />
      <hr />
      <UserInfoForm />
      <hr />
      <NewUserInfoForm resourceId="123" />
      <hr />
      <NewProductInfoForm resourceId="1234" />
    </>
  )
}

export default App
