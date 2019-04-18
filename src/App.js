import React from 'react';

import Auth from './Auth/Auth'

import { connect } from 'react-redux'
import { logOut } from './state/auth'


const App = (props) => (
  <div>
    <button
      onClick={props._logOut}
    >
      Wyloguj
    </button>
    SECRET COMPONENT
    <Auth />
  </div>
)


const mapDispatchToProps = dispatch => ({
  _logOut: () => dispatch(logOut())
})

export default connect(
  null,
  mapDispatchToProps
)(App)
