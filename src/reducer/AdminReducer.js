export const initialState = null

export const adminReducer = (state, action) =>{
    if(action.type == "ADMIN"){
        return action.payload
    }else if(action.type == "CLEAR"){
        return initialState
    }else{
        return state
    }
}