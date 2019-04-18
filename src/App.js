import React from 'react';
import moment from 'moment'
import 'moment/locale/pl'

//import Auth from './Auth/Auth'

import { connect } from 'react-redux'
import { logOut } from './state/auth'

moment.locale('pl')

const App = (props) => (
  <div>
    <button
      onClick={props._logOut}
    >
      Wyloguj
    </button>
    {
      Object.entries(props._userLoginsLogs || {})
        .map(
          ([key, value]) => (
            <div
              key={key}
              >
              {value.timestamp}
            </div>
          )
        )
    }


    
  </div>
)

const mapStateToProps = state => ({
  _userLoginsLogs: state.auth.userLoginsLogs

})

const mapDispatchToProps = dispatch => ({
  _logOut: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
