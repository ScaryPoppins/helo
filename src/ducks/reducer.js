const initialState = {
    user: []
}


const GET_USER = 'GET_USER';



export const getUser = (user) => {
    console.log(user)
    return {
        type: GET_USER,
        payload: user
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