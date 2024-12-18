import withEditableUser from './withEditableUser'

const UserInfoForm = withEditableUser(({user, onChangeUser, onSaveUser, onResetUser}) => {
    const {name, age, hairColor} = user || {}

    return user ? (
        <>
            <h2>User Info Form</h2>
            <form>
                <label>Name: 
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => onChangeUser({name: e.target.value})} 
                    />
                </label>
                <label>Age: 
                    <input 
                        type="number" 
                        value={age} 
                        onChange={e => onChangeUser({age: e.target.value})} 
                    />
                </label>
                <label>Hair Color: 
                    <input 
                        type="text" 
                        value={hairColor} 
                        onChange={e => onChangeUser({hairColor: e.target.value})} 
                    />
                </label>
                <br />
                <button type="button" onClick={onSaveUser}>Save</button>
                <button type="button" onClick={onResetUser}>Reset</button>
            </form>
        </>
    ): <p>Loading...</p>
}, "123");

export default UserInfoForm