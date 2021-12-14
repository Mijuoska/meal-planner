import { useEffect, useState } from 'react'
import Users from '../services/Users'
import Auth from '../services/Auth'

const Account = ( { show, displayMessage }) => {

const [userDetails, setUserDetails] = useState({})
const [editMode, setEditMode] = useState({})
console.log(editMode)


const enableEditing = (event) => {
event.target.previousElementSibling.disabled = false
const newState = {...editMode}
newState[event.target.parentElement.id] = true
setEditMode(newState)
}

const handleChange = (event) => {
const fieldName = event.target.name
const update = {'value': event.target.value, 'old_value': userDetails[fieldName]['value']}    
const newState = {...userDetails}
 newState[fieldName] = update
 setUserDetails(newState)

}

const saveChanges = (event) => {
event.target.previousElementSibling.disabled = true
const fieldName = event.target.parentElement.id
const oldValue = userDetails[fieldName]['old_value']
const changedValue = userDetails[fieldName]['value']

const newState = {
    ...editMode
}

newState[fieldName] = false
setEditMode(newState)

// Exit without call to server if value has not changed
if (!oldValue) {
    return
}

const updateBody = 
      {
    'field_name': fieldName,
     'value': changedValue,
    
        }

if (fieldName == 'password') {
    const passwordChange = {
        user_id: loggedInUser.id,
        new_password: changedValue,
        old_password: oldValue,
    }


    Auth.resetPassword(passwordChange).then(data => {
    displayMessage(`Password changed`, 'success', 5)
}).catch(err => {
    console.log(err)
})
} else {       

Users.update(loggedInUser.id, updateBody).then(data => {
    displayMessage(`Saved changes`, 'success', 5)
}).catch(err => {
    console.log(err)
})
}

}

const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))

useEffect(() => {
    if (loggedInUser && loggedInUser.id) {
    Users.get(loggedInUser.id).then(data => {
        const fields = {
            'first_name': {'value': data.first_name},
            'username': {'value': data.username},
            'password': {'value': data.password},
            'email': {'value': data.email}
        };
        setUserDetails(fields);
    }).catch(err => {
        console.log(err)
    })
}
}, [])
    
if (show) {

    const { first_name, username, password, email } = userDetails;

    return (
        <div className='form-container'>
        <div className='form-wrapper'>
        <form>
        <div id="first_name">
        <label><b>Name:</b></label> <input name='first_name' onChange={(event) => handleChange(event)} value={first_name.value} disabled/>
        {!editMode.first_name ? <span className='edit-save-field' id='edit_firstName' onClick={(event) => enableEditing(event)} >Edit</span> : null}
        {editMode.first_name ? <span className='edit-save-field' id='save_firstName' onClick={(event) => saveChanges(event)} >Save</span> : null}
        </div>
                <div id="username">

        <label><b>Username:</b></label> <input name='username' value={username.value} disabled/>
        </div>
         <div id="password">
        <label><b>Password:</b></label> <input name='password' type='password' onChange={(event) => handleChange(event)} value={password.value} disabled/>
         {!editMode.password ? <span className='edit-save-field' id='edit_password' onClick={(event) => enableEditing(event)} >Edit</span> : null}
        {editMode.password ? <span className='edit-save-field' id='save_password' onClick={(event) => saveChanges(event)} >Save</span> : null}
        </div>
        <div id="email">
        <label><b>Email:</b></label> <input name='email' onChange={(event) => handleChange(event)} value={email.value} disabled/>
         {!editMode.email ? <span className='edit-save-field' id='edit_email' onClick={(event) => enableEditing(event)} >Edit</span> : null}
        {editMode.email ? <span className='edit-save-field' id='save_email' onClick={(event) => saveChanges(event)} >Save</span> : null}
       </div>
        </form>
        </div>
        </div>
    )
} else {
    return null
}
}

export default Account