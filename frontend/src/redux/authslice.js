import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        loading:false,
    },
    reducer:{
        setLoading:(state, action) =>{
            state.loading = action.payload;
        }
    }
})

export const {setLoading} = authSlice.actions;
export default authSlice.reducer;