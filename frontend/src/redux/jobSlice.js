import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"jobSlice",
    initialState:{
        allJobs:[],
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        }
    }
});

export const {setAllJobs} = jobSlice.actions;
export default jobSlice.reducer;