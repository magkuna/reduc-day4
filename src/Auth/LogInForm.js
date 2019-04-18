import React from 'react'

const LogInForm = (props) => (
  <div>
    <input 
      type={'text'}
      value={props.email}
      onChange={props.onEmailChange}
      autoComplete={'off'}
    />
    <input 
      type={'password'}
      value={props.password}
      onChange={props.onPasswordChange}
      autoComplete={'off'}
    />
    <button
      onClick={props.onLogInClick}
    >
      LOG IN!
    </button>
  </div>
)

export default LogInForm