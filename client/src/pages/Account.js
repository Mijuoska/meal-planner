import React, { useEffect, useState} from 'react'
import Users from '../services/Users'
import Auth from '../services/Auth'

const Account = ( { show, displayMessage }) => {

const [formFields, setFormFields] = useState({})
const [userDetails, setUserDetails] = useState({})
const [editMode, setEditMode] = useState({})

const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))


const enableEditing = (event) => {
event.target.previousElementSibling.disabled = false
const newState = {...editMode}
newState[event.target.parentElement.id] = true
setEditMode(newState)
}

const handleChange = event => {
const fieldName = event.target.name
const newValue = event.target.value

const newState = {
    ...formFields
}
newState[fieldName]['value'] = newValue
setFormFields(newState)
}


const saveChanges = (event) => {
event.target.previousElementSibling.disabled = true
const fieldName = event.target.parentElement.id
const oldValue = userDetails[fieldName]['value']
const newValue = formFields[fieldName]['value']


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
     'value': newValue,
    
        }

if (fieldName === 'password') {

    Auth.resetPassword({new_password: newValue}).then(data => {
    const newUserDetails = {...userDetails, password: data.password}
    setUserDetails(newUserDetails)
    setFormFields(newUserDetails)
    displayMessage(`Password changed`, 'success', 5)
}).catch(err => {
    displayMessage(err.response.data.message, 'error', 5)
    const oldFormFields = {...formFields, 'password': oldValue}
    setFormFields(oldFormFields)
    console.log(err.message)
})
} else {       

Users.update(loggedInUser.id, updateBody).then(() => {
    setUserDetails(formFields)
    displayMessage(`Saved changes`, 'success', 5)
}).catch(err => {
    console.log(err)
})
}

}


useEffect(() => {    
    if (loggedInUser && loggedInUser.id) {
    Users.get(loggedInUser.id).then(data => {
        
        const fields = {
            'first_name': {'value': data.first_name},
            'username': {'value': data.username},
            'password': {'value': data.password},
            'email': {'value': data.email},
            'household_name': { 'value': data.household_name}
        };
        setFormFields(fields)
        setUserDetails(fields);
    }).catch(err => {
        console.log(err)
    })
}
}, [show])
    
if (show) {

    const { first_name, username, password, email, household_name } = formFields;

    return (
        <div className='form-container'>
        <div className='form-wrapper'>
        <form>
        <div id="first_name">
        <label><b>Name:</b></label> <input className='account' name='first_name' onChange={(event) => handleChange(event)} value={first_name ? first_name.value : null} disabled/>
        {!editMode.first_name ? <span className='edit-save-field' id='edit_firstName' onClick={(event) => enableEditing(event)} >Edit</span> : null}
        {editMode.first_name ? <span className='edit-save-field' id='save_firstName' onClick={(event) => saveChanges(event)} >Save</span> : null}
        </div>
                <div id="username">

        <label><b>Username:</b></label> <input className="account" name='username' value={username ? username.value : null} disabled/>
        </div>
         <div id="password">
        <label><b>Password:</b></label> <input className="account" name='password' type='password' onChange={(event) => handleChange(event)} value={password ? password.value : null} disabled/>
         {!editMode.password ? <span className='edit-save-field' id='edit_password' onClick={(event) => enableEditing(event)} >Edit</span> : null}
        {editMode.password ? <span className='edit-save-field' id='save_password' onClick={(event) => saveChanges(event)} >Save</span> : null}
        </div>
        <div id="email">
        <label><b>Email:</b></label> <input className="account" name='email' onChange={(event) => handleChange(event)} value={email ? email.value : null} disabled/>
         {!editMode.email ? <span className='edit-save-field' id='edit_email' onClick={(event) => enableEditing(event)} >Edit</span> : null}
        {editMode.email ? <span className='edit-save-field' id='save_email' onClick={(event) => saveChanges(event)} >Save</span> : null}
       </div>
        <div id="email">
        <label><b>Household name:</b></label> <input className="account" name='household_name' onChange={(event) => handleChange(event)} value={household_name ? household_name.value : null} disabled/>
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