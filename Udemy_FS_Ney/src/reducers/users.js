const initState = {
    username: '',
    token: '',
    submittingLogin: false,
    messageError: null
}
/**
 * 
 * @param {*} state 
 * @param {*} action { type: '', payload: {} }
 */
export default function userReducer(state = initState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESSED': 
            return {
                username: action.payload.username,
                token: action.payload.token,
            };
            
        case 'USER_REQUEST_LOGIN':
            return {
                ...state,
                submittingLogin: true
            };
        
        case 'USER_LOGIN_ERROR':
            return {
                ...state,
                submittingLogin: false,
                messageError: action.payload.message
            };
        
        case 'CLEAR_STATE_USER':  //LOGOUT
            return {};
        
        default:
            return state;
    }
}