export const initialState = null

export const staffReducer = (state, action) => {
    if (action.type == "STAFF") {
        return action.payload
    } else if (action.type == "CLEAR") {
        return initialState
    } else {
        return state
    }
}