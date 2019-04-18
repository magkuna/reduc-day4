const LOGIN = 'auth/LOGIN'

const setActionCreator = () => ({
    type: LOGIN,

})


const initialState = {
    user: null,
    email: 'email',
    password: 'password'
}



export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user,
                email: action.email,
                password: action.password,
            }
        default:
            return state
    }
}