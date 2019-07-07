const initialState = {
    user: []
}

// const HANDLE_UPDATE_USER = 'HANDLE_UPDATE_USER';
const GET_USER = 'GET_USER';

//same as getUser I think???   check later

// export const handleUpdateUser = (user) => {
//     return {
//         type: HANDLE_UPDATE_USER,
//         payload: user
//     }
// }


//Gets user object from auth controller
export function getUser(userInfo) {
    console.log(userInfo)
    return {
        type: GET_USER,
        payload: userInfo
    }
}

//login
export default function reducer(state = initialState, action) {

    switch(action.type) {

        case GET_USER:
        return {
            ...state,
            user: action.payload
        }
        default: return state;
    }
}