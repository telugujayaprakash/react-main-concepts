# redux tool kit
1.createSlice({
    name:'sliceName',  //unique name of the slice
    initialState:{},   //starting state
    reducers:{         //object of reducer
        actionName:(state,action) =>{ ... },
    },
});