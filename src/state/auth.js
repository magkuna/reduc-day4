import { auth, googleProvider, database } from '../firebaseConfig'

const EMAIL_CHANGED = 'auth/EMAIL_CHANGED'
const PASS_CHANGED = 'auth/PASS_CHANGED'
const SET_USER = 'auth/SET_USER'
const SET_USER_LOGINS_LOGS = 'auth/SET_USER_LOGINS_LOGS'

export const startListeningToAuthChangesAsyncActionCreator = (
    () => (dispatch, getState) => {
        auth.onAuthStateChanged(
            (user) => {
                console.log(user)

                if (user) {
                    // USER LOGGED IN
                    dispatch(setUserActionCreator(user))
                    dispatch(passwordChangedActionCreator(''))
                    dispatch(emailChangedActionCreator(''))
                    dispatch(logUserLoginsAsyncActionCreator())
                    dispatch(startListeningUserLoginsLogsAsyncActionCreator())
                  } else {
                    // USER NOT LOGGED IN
                    dispatch(stopListeningUserLoginsLogsAsyncActionCreator())
                    dispatch(setUserLoginsLogsActionCreator(null))
                    dispatch(setUserActionCreator(user))
                }

            }
        )
    }
)
export const stopListeningUserLoginsLogsAsyncActionCreator = (
    () => (dispatch, getState) => {
        const state = getState()
        const userId = state.auth.user.uid && state.auth.user.uid
        
        if(!userId) return

        database.ref(`users/${userId}/login`).off()
    }
)

export const startListeningUserLoginsLogsAsyncActionCreator = (
    () => (dispatch, getState) => {
        const state = getState()
        const userId = state.auth.user.uid

        database.ref(`users/${userId}/login`)
            .on(
                'value',
                (snapshot) => {
                    dispatch(
                        setUserLoginsLogsActionCreator(
                            snapshot.val()
                        )
                    )
                }
            )

    })


export const logUserLoginsAsyncActionCreator = () => (dispatch, getState) => {
    const state = getState()
    const userId = state.auth.user.uid

    database.ref(`users/${userId}/login`)
        .push({
            timestamp: Date.now(),
        })
}
export const logInAsyncActionCreator = () => (dispatch, getState) => {
    const state = getState()
    const email = state.auth.email
    const password = state.auth.password

    auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('ZALOGOWANO'))
        .catch((error) => console.log('WYSTĄPIŁ BŁĄD', error))
}
export const logInByGoogleAsyncActionCreator = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
        .then(() => console.log('ZALOGOWANO'))
        .catch((error) => console.log('WYSTĄPIŁ BŁĄD', error))
}
export const logOut = () => (dispatch, getState) => {
    auth.signOut()
}

export const setUserActionCreator = user => ({
    type: SET_USER,
    user,
})
export const emailChangedActionCreator = newValue => ({
    type: EMAIL_CHANGED,
    newValue,
})
export const passwordChangedActionCreator = newValue => ({
    type: PASS_CHANGED,
    newValue,
})

export const setUserLoginsLogsActionCreator = data => ({
    type: SET_USER_LOGINS_LOGS,
    data
})
const initialState = {
    user: null,
    email: '',
    password: '',
    userLoginsLogs: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {
                ...state,
                email: action.newValue,
            }
        case PASS_CHANGED:
            return {
                ...state,
                password: action.newValue,
            }
        case SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case SET_USER_LOGINS_LOGS:
            return {
                ...state,
                userLoginsLogs: action.data
            }
        default:
            return state
    }
}