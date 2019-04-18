import React from 'react'

import { connect } from 'react-redux'
import {emailChangedActionCreator, passwordChangedActionCreator, logInAsyncActionCreator , logInByGoogleAsyncActionCreator} from '../state/auth'

import Forms from './Forms'

const Auth = (props) => (
    <div>
        {
            props._user ?
                props.children
                :
                <Forms
                    email={props._email}
                    password={props._password}
                    onEmailChange={props._onEmailChange}
                    onPasswordChange={props._onPassChange}
                    onLogInClick={props._logIn}
                    onLogInByGoogleClick={props._logInByGoogle}
                />
        }
    </div>
)

const mapStateToProps = state => ({
    _user: state.auth.user,
    _email: state.auth.email,
    _password: state.auth.password

})

const mapDispatchToProps = dispatch => ({
    _onEmailChange: (event) => dispatch (emailChangedActionCreator(event.target.value)),
    _onPassChange: (event) => dispatch (passwordChangedActionCreator(event.target.value)),
    _logIn: () => dispatch (logInAsyncActionCreator()),
    _logInByGoogle: () => dispatch (logInByGoogleAsyncActionCreator())


})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth) 