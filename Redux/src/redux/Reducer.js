const initialValue = {
    value: 0
}

export const likeReducer = (state = initialValue, action) => {
    if (action.type == "INCREMENT") {
        return { ...state, value: state.value + 1 }
    } else if (action.type == "DECREMENT") {
        return { ...state, value: state.value - 1 }
    } else if (action.type == "RESET") {
        return { ...state, value: state.value = 0 }
    } else {
        return state
    }
}