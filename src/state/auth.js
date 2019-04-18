import { auth, googleProvider, database } from '../firebaseConfig'

const EMAIL_CHANGED = 'auth/EMAIL_CHANGED'
const PASS_CHANGED = 'auth/PASS_CHANGED'
const SET_USER = 'auth/SET_USER'

export const startListeningToAuthChangesAsyncActionCreator = (
    () => (dispatch, getState) => {
        auth.onAuthStateChanged(
            (user) => {
                if (user) {
                    console.log(user)
                    this.setState({ isUserLoggedIn: true })
                } else {
                    this.setState({ isUserLoggedIn: false })
                }

                console.log(user)
                dispatch(setUserActionCreator(user))
            }
        )
    }
)

export const logInAsyncActionCreator = () => (dispatch, getState) => {
    const state = getState()
    const email = state.auth.email
    const password = state.auth.password

    auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('ZALogoWANO'))
        .catch((error) => console.log('Wystąpił błąd'))
}

const setUserActionCreator = user => ({
    type: SET_USER,
    user
})

export const emailChangedActionCreator = newValue => ({
    type: EMAIL_CHANGED,
    newValue

})
export const passwordChangedActionCreator = newValue => ({
    type: PASS_CHANGED,
    newValue

})
export const logInByGoogleAsyncActionCreator = () => (dispatch,getState) => {
    auth.signInWithPopup(googleProvider)
    .then(() => console.log ('Zalogowano'))
    .catch((error) => console.log ('Wystąpił błąd' , error))
}



const initialState = {
    user: null,
    email: '',
    password: ''
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
                user: action.user
            }
        default:
            return state
    }
}