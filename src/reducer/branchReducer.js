export const initialState = null

export const branchReducer = (state, action) =>{
    if(action.type == "BRANCH"){
        return action.payload
    }else if(action.type == "CLEAR"){
        return initialState
    }else{
        return state
    }
}