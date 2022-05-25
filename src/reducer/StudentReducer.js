export const initialState = null

export const studentReducer = (state, action) =>{
    if(action.type == "STUDENT"){
        return action.payload
    }else if(action.type == "CLEAR"){
        return initialState
    }else{
        return state
    }
}